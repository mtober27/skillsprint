import { ACHIEVEMENTS } from '../data/achievements.js';
import { challengePool } from '../data/challenges.js';
import { lessonList, lessonsById, paths, pathsById, topics, topicsById } from '../data/catalog.js';
import { DEMO_LEARNERS } from '../data/leaderboard.js';

export const PATH_BONUS = 75;
export const STORAGE_KEY = 'skillsprint.v1';
export const ROUTE_KEY = 'skillsprint.route';

const DATE_KEY = /^\d{4}-\d{2}-\d{2}$/;
const topicIds = new Set(topics.map((topic) => topic.id));
const lessonIds = new Set(lessonList.map((lesson) => lesson.id));
const pathIds = new Set(paths.map((path) => path.id));
const achievementIds = new Set(ACHIEVEMENTS.map((item) => item.id));
const challengesById = Object.fromEntries(challengePool.map((item) => [item.id, item]));

export function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDateKey(key) {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

export function addDays(key, delta) {
  const date = parseDateKey(key);
  date.setDate(date.getDate() + delta);
  return todayKey(date);
}

export function dayOfYear(date) {
  const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const start = Date.UTC(date.getFullYear(), 0, 1);
  return Math.floor((utc - start) / 86400000) + 1;
}

export function freshState(overrides = {}) {
  return {
    name: 'Mike',
    onboarded: false,
    interests: [],
    xp: 0,
    lessons: {},
    challenges: {},
    pathBonuses: {},
    unlocks: {},
    streak: 0,
    lastActiveDate: null,
    activity: {},
    ...overrides,
  };
}

export function xpToAdvance(level) {
  return 60 + level * 30;
}

export function levelProgress(xp) {
  const safeXp = Math.max(0, Number(xp) || 0);
  let level = 1;
  let spent = 0;
  while (level < 99) {
    const need = xpToAdvance(level);
    if (safeXp < spent + need) {
      const into = safeXp - spent;
      return {
        level,
        into,
        need,
        pct: Math.round((into / need) * 100),
      };
    }
    spent += need;
    level += 1;
  }
  return { level, into: 0, need: xpToAdvance(level), pct: 100 };
}

const RANK_TITLES = [
  [1, 'Newcomer'],
  [2, 'Learner'],
  [3, 'Apprentice'],
  [4, 'Practitioner'],
  [5, 'Specialist'],
  [6, 'Strategist'],
  [7, 'Expert'],
  [8, 'Mentor'],
  [9, 'Virtuoso'],
  [10, 'Luminary'],
];

export function rankTitle(level) {
  if (level >= 12) return 'Legend';
  let title = 'Newcomer';
  for (const [minimum, name] of RANK_TITLES) {
    if (level >= minimum) title = name;
  }
  return title;
}

export function lessonXp(correct) {
  return 20 + correct * 25;
}

export function challengeXp(difficulty, correct) {
  const base = { easy: 25, medium: 45, hard: 70 };
  const per = { easy: 15, medium: 20, hard: 30 };
  return base[difficulty] + correct * per[difficulty];
}

export function recomputeXp(state) {
  let xp = 0;
  for (const lesson of Object.values(state.lessons || {})) xp += lesson.xpAwarded || 0;
  for (const challenge of Object.values(state.challenges || {})) xp += challenge.xpAwarded || 0;
  xp += Object.keys(state.pathBonuses || {}).length * PATH_BONUS;
  return xp;
}

export function challengeInstanceId(date, baseId) {
  return `${date}:${baseId}`;
}

export function lessonStatus(state, lessonId) {
  const lesson = lessonsById[lessonId];
  if (!lesson) return { missing: true, locked: true, done: false, lesson: null, path: null, prevId: null };
  const path = pathsById[lesson.pathId];
  const index = path.lessons.indexOf(lessonId);
  const done = Boolean(state.lessons[lessonId]);
  const prevId = index > 0 ? path.lessons[index - 1] : null;
  const locked = Boolean(prevId) && !state.lessons[prevId];
  return { missing: false, done, locked, index, prevId, path, lesson };
}

export function dailyChallenges(date = new Date()) {
  const day = dayOfYear(date);
  return ['easy', 'medium', 'hard'].map((difficulty, offset) => {
    const list = challengePool.filter((item) => item.difficulty === difficulty);
    const index = (day + offset) % list.length;
    return list[index];
  });
}

function markActive(state, today, gained) {
  let streak = state.streak || 0;
  if (state.lastActiveDate !== today) {
    streak = state.lastActiveDate === addDays(today, -1) ? streak + 1 : 1;
  } else if (streak < 1) {
    streak = 1;
  }
  const activity = { ...state.activity };
  activity[today] = (activity[today] || 0) + gained;
  return { streak, lastActiveDate: today, activity };
}

export function deriveSnapshot(state, today = todayKey()) {
  let correct = 0;
  let answered = 0;
  let perfectAny = false;
  const topicsTouched = new Set();

  for (const [id, record] of Object.entries(state.lessons || {})) {
    correct += record.correct || 0;
    answered += record.total || 0;
    if (record.total > 0 && record.correct === record.total) perfectAny = true;
    const lesson = lessonsById[id];
    if (lesson) topicsTouched.add(pathsById[lesson.pathId].topic);
  }

  const diffsToday = new Set();
  let challengesDone = 0;
  for (const record of Object.values(state.challenges || {})) {
    challengesDone += 1;
    correct += record.correct || 0;
    answered += record.total || 0;
    if (record.total > 0 && record.correct === record.total) perfectAny = true;
    if (record.date === today) diffsToday.add(record.difficulty);
  }

  const pathsDone = paths.filter((path) => path.lessons.every((id) => state.lessons?.[id])).length;
  const xp = recomputeXp(state);
  return {
    lessonsDone: Object.keys(state.lessons || {}).length,
    perfectAny,
    pathsDone,
    streak: state.streak || 0,
    challengesDone,
    todayDifficultyCount: ['easy', 'medium', 'hard'].filter((difficulty) => diffsToday.has(difficulty)).length,
    trifectaToday: ['easy', 'medium', 'hard'].every((difficulty) => diffsToday.has(difficulty)),
    level: levelProgress(xp).level,
    accuracy: answered ? correct / answered : null,
    answers: answered,
    topicsTouched: topicsTouched.size,
    xp,
    pathCount: paths.length,
    lessonCount: lessonList.length,
  };
}

function withUnlocks(state, today) {
  const snapshot = deriveSnapshot(state, today);
  const unlocks = { ...state.unlocks };
  const fresh = [];
  for (const item of ACHIEVEMENTS) {
    if (!unlocks[item.id] && item.isMet(snapshot)) {
      unlocks[item.id] = today;
      fresh.push(item);
    }
  }
  return { state: { ...state, unlocks }, fresh, snapshot };
}

function awardFrom(beforeState, nextState, today, extra) {
  const beforeLevel = levelProgress(recomputeXp(beforeState)).level;
  const unlocked = withUnlocks({ ...nextState, xp: recomputeXp(nextState) }, today);
  const afterLevel = levelProgress(unlocked.state.xp).level;
  return {
    state: unlocked.state,
    award: {
      ...extra,
      newUnlocks: unlocked.fresh,
      levelBefore: beforeLevel,
      levelAfter: afterLevel,
      leveledUp: afterLevel > beforeLevel,
    },
  };
}

export function applyLessonResult(state, { lessonId, correct, total, today = todayKey() }) {
  const status = lessonStatus(state, lessonId);
  if (status.missing) return { state, error: 'missing' };
  if (status.locked) return { state, error: 'locked' };
  if (!Number.isInteger(total) || total < 1) return { state, error: 'invalid' };

  const boundedCorrect = Math.max(0, Math.min(correct, total));
  const already = state.lessons[lessonId];
  const xpAwarded = already?.xpAwarded ?? lessonXp(boundedCorrect);
  const lessons = {
    ...state.lessons,
    [lessonId]: {
      correct: boundedCorrect,
      total,
      completedAt: already?.completedAt || today,
      xpAwarded,
    },
  };

  const pathBonuses = { ...state.pathBonuses };
  const pathComplete = status.path.lessons.every((id) => lessons[id]);
  const finishingNow = pathComplete && !already && !state.pathBonuses[status.path.id];
  let pathBonus = 0;
  if (finishingNow) {
    pathBonuses[status.path.id] = today;
    pathBonus = PATH_BONUS;
  }

  const gained = already ? 0 : xpAwarded + pathBonus;
  const next = {
    ...state,
    lessons,
    pathBonuses,
    ...markActive(state, today, gained),
  };

  return awardFrom(state, next, today, {
    alreadyDone: Boolean(already),
    xpGained: gained,
    lessonXp: already ? 0 : xpAwarded,
    pathBonus: already ? 0 : pathBonus,
    pathTitle: status.path.title,
    pathComplete,
    correct: boundedCorrect,
    total,
  });
}

export function applyChallengeResult(state, { baseId, correct, total, today = todayKey() }) {
  const challenge = challengesById[baseId];
  if (!challenge) return { state, error: 'missing' };
  if (!Number.isInteger(total) || total < 1) return { state, error: 'invalid' };

  const instanceId = challengeInstanceId(today, baseId);
  const already = state.challenges[instanceId];
  const boundedCorrect = Math.max(0, Math.min(correct, total));
  const xpAwarded = already?.xpAwarded ?? challengeXp(challenge.difficulty, boundedCorrect);
  const record = {
    baseId,
    difficulty: challenge.difficulty,
    topic: challenge.topic,
    title: challenge.title,
    correct: boundedCorrect,
    total,
    date: today,
    completedAt: already?.completedAt || today,
    xpAwarded,
  };
  const gained = already ? 0 : xpAwarded;
  const next = {
    ...state,
    challenges: { ...state.challenges, [instanceId]: record },
    ...markActive(state, today, gained),
  };

  return awardFrom(state, next, today, {
    alreadyDone: Boolean(already),
    xpGained: gained,
    challengeXp: already ? 0 : xpAwarded,
    pathBonus: 0,
    title: challenge.title,
    difficulty: challenge.difficulty,
    correct: boundedCorrect,
    total,
  });
}

export function topicAccuracy(state) {
  const rows = new Map(topics.map((topic) => [topic.id, { correct: 0, total: 0, done: 0, available: 0 }]));
  for (const lesson of lessonList) {
    const topicId = pathsById[lesson.pathId].topic;
    const row = rows.get(topicId);
    row.available += 1;
    const record = state.lessons?.[lesson.id];
    if (!record) continue;
    row.done += 1;
    row.correct += record.correct || 0;
    row.total += record.total || 0;
  }
  return topics.map((topic) => {
    const row = rows.get(topic.id);
    return {
      ...topic,
      ...row,
      accuracy: row.total ? row.correct / row.total : null,
    };
  });
}

function nextOpen(state, path) {
  const id = path.lessons.find((lessonId) => !state.lessons[lessonId]);
  return id ? lessonsById[id] : null;
}

function remaining(state, path) {
  return path.lessons.filter((id) => !state.lessons[id]).length;
}

export function recommendations(state, today = todayKey()) {
  const items = [];
  const used = new Set();
  const push = (item) => {
    if (!item || items.length >= 3 || used.has(item.dedupe)) return;
    used.add(item.dedupe);
    items.push(item);
  };

  const weak = topicAccuracy(state)
    .filter((topic) => topic.total >= 2 && topic.accuracy != null && topic.accuracy < 0.75)
    .sort((a, b) => a.accuracy - b.accuracy)[0];

  if (weak) {
    const match = paths
      .filter((path) => path.topic === weak.id)
      .map((path) => ({ path, lesson: nextOpen(state, path) }))
      .find((entry) => entry.lesson);
    if (match) {
      const percent = Math.round(weak.accuracy * 100);
      push({
        dedupe: match.lesson.id,
        kind: 'lesson',
        tone: 'repair',
        title: match.lesson.title,
        eyebrow: `${weak.name} · strengthen`,
        reason: `Your latest lesson accuracy in ${weak.name} is ${percent}% across ${weak.total} questions. ${match.lesson.title} is the next open step in ${match.path.title}, so you can rebuild the idea before the path moves on.`,
        route: { name: 'lesson', lessonId: match.lesson.id },
      });
    }
  }

  const preferred = state.interests?.length ? paths.filter((path) => state.interests.includes(path.topic)) : paths;
  const started = preferred
    .filter((path) => path.lessons.some((id) => state.lessons[id]) && path.lessons.some((id) => !state.lessons[id]))
    .sort((a, b) => remaining(state, a) - remaining(state, b));

  if (started[0]) {
    const lesson = nextOpen(state, started[0]);
    const done = started[0].lessons.length - remaining(state, started[0]);
    const left = remaining(state, started[0]);
    push({
      dedupe: lesson.id,
      kind: 'lesson',
      tone: 'continue',
      title: lesson.title,
      eyebrow: started[0].title,
      reason:
        left === 1
          ? `One lesson remains in ${started[0].title}. Finishing it closes the path and banks the ${PATH_BONUS} XP path bonus.`
          : `You already started ${started[0].title}. ${done} of ${started[0].lessons.length} lessons are complete, and this is the next unlocked step.`,
      route: { name: 'lesson', lessonId: lesson.id },
    });
  }

  const fresh = preferred.find((path) => path.lessons.every((id) => !state.lessons[id]));
  if (fresh) {
    const lesson = lessonsById[fresh.lessons[0]];
    const topic = topicsById[fresh.topic];
    const focused = state.interests?.includes(fresh.topic);
    push({
      dedupe: lesson.id,
      kind: 'lesson',
      tone: 'interest',
      title: lesson.title,
      eyebrow: `${topic.name} · new path`,
      reason: focused
        ? `${topic.name} is one of your saved focus areas, and ${fresh.title} is still unopened. ${fresh.summary}`
        : `${fresh.title} is the next unopened path. ${fresh.summary}`,
      route: { name: 'lesson', lessonId: lesson.id },
    });
  }

  const openChallenge = dailyChallenges(parseDateKey(today)).find(
    (challenge) => !state.challenges?.[challengeInstanceId(today, challenge.id)],
  );
  if (openChallenge) {
    push({
      dedupe: `challenge-${openChallenge.id}`,
      kind: 'challenge',
      tone: 'daily',
      title: openChallenge.title,
      eyebrow: `Daily · ${openChallenge.difficulty}`,
      reason: `This ${openChallenge.difficulty} challenge is still open today. Daily sets pay XP separately from lessons, and clearing easy, medium, and hard on the same day unlocks Triple Threat.`,
      route: { name: 'challenge', challengeId: openChallenge.id },
    });
  }

  for (const path of preferred) {
    const lesson = nextOpen(state, path);
    if (!lesson) continue;
    push({
      dedupe: lesson.id,
      kind: 'lesson',
      tone: 'next',
      title: lesson.title,
      eyebrow: path.title,
      reason: `${path.summary} This step is unlocked now.`,
      route: { name: 'lesson', lessonId: lesson.id },
    });
  }

  if (!items.length) {
    return [
      {
        dedupe: 'review',
        kind: 'review',
        tone: 'master',
        title: 'Review a finished path',
        eyebrow: 'Catalog complete',
        reason:
          'Every lesson is complete. A replay replaces that lesson’s saved accuracy and keeps your streak alive. Today’s challenges can still pay XP once each.',
        route: { name: 'discover' },
      },
    ];
  }

  return items;
}

export function leaderboard(state) {
  const xp = recomputeXp(state);
  const you = {
    id: 'you',
    name: state.name?.trim() || 'You',
    xp,
    you: true,
    role: rankTitle(levelProgress(xp).level),
  };
  const rows = [...DEMO_LEARNERS.map((learner) => ({ ...learner, you: false })), you];
  rows.sort((a, b) => {
    if (b.xp !== a.xp) return b.xp - a.xp;
    if (a.you) return -1;
    if (b.you) return 1;
    return a.name.localeCompare(b.name);
  });
  return rows.map((row, index) => ({ ...row, rank: index + 1 }));
}

export function recentDays(count = 7, today = todayKey()) {
  const days = [];
  for (let offset = count - 1; offset >= 0; offset -= 1) {
    const key = addDays(today, -offset);
    const date = parseDateKey(key);
    days.push({
      key,
      label: date.toLocaleDateString(undefined, { weekday: 'narrow' }),
      isToday: offset === 0,
    });
  }
  return days;
}

export function greeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function formatPercent(value) {
  if (value == null || Number.isNaN(value)) return '—';
  return `${Math.round(value * 100)}%`;
}

export function sanitize(raw) {
  const base = freshState();
  if (!raw || typeof raw !== 'object') return base;

  const lessons = {};
  if (raw.lessons && typeof raw.lessons === 'object') {
    for (const [id, record] of Object.entries(raw.lessons)) {
      if (!lessonIds.has(id) || !record || typeof record !== 'object') continue;
      const total = Number(record.total);
      if (!Number.isInteger(total) || total < 1) continue;
      lessons[id] = {
        correct: Math.max(0, Math.min(Number(record.correct) || 0, total)),
        total,
        completedAt: DATE_KEY.test(record.completedAt) ? record.completedAt : todayKey(),
        xpAwarded: Math.max(0, Number(record.xpAwarded) || 0),
      };
    }
  }

  const challenges = {};
  if (raw.challenges && typeof raw.challenges === 'object') {
    for (const record of Object.values(raw.challenges)) {
      if (!record || typeof record !== 'object') continue;
      const challenge = challengesById[record.baseId];
      if (!challenge || !DATE_KEY.test(record.date)) continue;
      const total = Number(record.total);
      if (!Number.isInteger(total) || total < 1) continue;
      const instanceId = challengeInstanceId(record.date, challenge.id);
      challenges[instanceId] = {
        baseId: challenge.id,
        difficulty: challenge.difficulty,
        topic: challenge.topic,
        title: challenge.title,
        correct: Math.max(0, Math.min(Number(record.correct) || 0, total)),
        total,
        date: record.date,
        completedAt: DATE_KEY.test(record.completedAt) ? record.completedAt : record.date,
        xpAwarded: Math.max(0, Number(record.xpAwarded) || 0),
      };
    }
  }

  const pathBonuses = {};
  if (raw.pathBonuses && typeof raw.pathBonuses === 'object') {
    for (const [id, value] of Object.entries(raw.pathBonuses)) {
      if (pathIds.has(id)) pathBonuses[id] = DATE_KEY.test(value) ? value : todayKey();
    }
  }

  const unlocks = {};
  if (raw.unlocks && typeof raw.unlocks === 'object') {
    for (const [id, value] of Object.entries(raw.unlocks)) {
      if (achievementIds.has(id)) unlocks[id] = DATE_KEY.test(value) ? value : todayKey();
    }
  }

  const activity = {};
  if (raw.activity && typeof raw.activity === 'object') {
    for (const [key, value] of Object.entries(raw.activity)) {
      if (!DATE_KEY.test(key) || !Number.isFinite(Number(value))) continue;
      activity[key] = Math.max(0, Number(value));
    }
  }

  const name = typeof raw.name === 'string' ? raw.name.trim().slice(0, 24) : '';
  const lastActiveDate = DATE_KEY.test(raw.lastActiveDate) ? raw.lastActiveDate : null;
  const next = {
    ...base,
    name: name || base.name,
    onboarded: Boolean(raw.onboarded),
    interests: Array.isArray(raw.interests) ? [...new Set(raw.interests.filter((id) => topicIds.has(id)))] : [],
    lessons,
    challenges,
    pathBonuses,
    unlocks,
    activity,
    lastActiveDate,
    streak: lastActiveDate ? Math.max(0, Math.round(Number(raw.streak) || 0)) : 0,
  };
  next.xp = recomputeXp(next);
  return next;
}

export function buildDerived(state, now = new Date()) {
  const today = typeof now === 'string' ? now : todayKey(now);
  const date = typeof now === 'string' ? parseDateKey(now) : now;
  const xp = recomputeXp(state);
  const level = levelProgress(xp);
  const board = leaderboard(state);
  const snapshot = deriveSnapshot(state, today);
  const recommendationList = recommendations(state, today);
  return {
    today,
    xp,
    level,
    title: rankTitle(level.level),
    snapshot,
    topics: topicAccuracy(state),
    recommendations: recommendationList,
    continueItem: recommendationList.find((item) => item.kind === 'lesson') || recommendationList[0],
    board,
    rank: board.find((row) => row.you).rank,
    achievements: ACHIEVEMENTS.map((item) => ({
      ...item,
      earnedAt: state.unlocks[item.id] || null,
      progress: item.metric(snapshot),
    })),
    days: recentDays(7, today),
    daily: dailyChallenges(date).map((challenge) => ({
      ...challenge,
      record: state.challenges[challengeInstanceId(today, challenge.id)] || null,
    })),
    greeting: greeting(date),
  };
}

export function describeAward(award) {
  if (award.alreadyDone) {
    return 'Practice saved. This attempt replaces the saved score. XP from the first clear stays banked.';
  }
  const parts = [`+${award.xpGained} XP`];
  if (award.pathBonus) parts.push(`${award.pathTitle} complete, including ${award.pathBonus} XP`);
  if (award.newUnlocks?.length) {
    parts.push(`Unlocked ${award.newUnlocks.map((item) => item.title).join(', ')}`);
  }
  return parts.join(' · ');
}

const ROUTE_NAMES = new Set(['dashboard', 'discover', 'path', 'lesson', 'challenges', 'challenge', 'achievements', 'leaderboard']);

export function sanitizeRoute(raw) {
  if (!raw || typeof raw !== 'object' || !ROUTE_NAMES.has(raw.name)) return { name: 'dashboard' };
  if (raw.name === 'lesson') {
    return lessonsById[raw.lessonId] ? { name: 'lesson', lessonId: raw.lessonId } : { name: 'dashboard' };
  }
  if (raw.name === 'path') {
    return pathsById[raw.pathId] ? { name: 'path', pathId: raw.pathId } : { name: 'dashboard' };
  }
  if (raw.name === 'challenge') {
    return challengesById[raw.challengeId] ? { name: 'challenge', challengeId: raw.challengeId } : { name: 'challenges' };
  }
  return { name: raw.name };
}
