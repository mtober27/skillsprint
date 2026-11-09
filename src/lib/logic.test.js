import assert from 'node:assert/strict';
import test from 'node:test';
import { challengePool } from '../data/challenges.js';
import { lessonList, lessonsById, paths, pathsById, topics } from '../data/catalog.js';
import { DEMO_LEARNERS } from '../data/leaderboard.js';
import {
  PATH_BONUS,
  applyChallengeResult,
  applyLessonResult,
  challengeInstanceId,
  challengeXp,
  dailyChallenges,
  freshState,
  leaderboard,
  lessonXp,
  levelProgress,
  parseDateKey,
  recommendations,
  sanitize,
} from './logic.js';

test('curriculum is complete and every question has one answer', () => {
  assert.equal(topics.length, 6);
  assert.equal(paths.length, 12);
  assert.equal(lessonList.length, 27);
  assert.ok(challengePool.length >= 12);

  const seen = new Set();
  for (const lesson of lessonList) {
    assert.equal(seen.has(lesson.id), false);
    seen.add(lesson.id);
    assert.ok(pathsById[lesson.pathId]);
    assert.ok(lesson.paragraphs.length >= 2);
    assert.ok(lesson.example.body.length > 40);
    assert.ok(lesson.questions.length >= 2);
    for (const question of lesson.questions) {
      assert.equal(question.choices.filter((choice) => choice.correct).length, 1);
      assert.ok(question.explain.length > 20);
    }
  }

  for (const path of paths) {
    assert.ok(path.lessons.length >= 2);
    for (const id of path.lessons) assert.equal(lessonsById[id].pathId, path.id);
  }

  for (const difficulty of ['easy', 'medium', 'hard']) {
    assert.ok(challengePool.filter((item) => item.difficulty === difficulty).length >= 3);
  }
  for (const challenge of challengePool) {
    assert.equal(challenge.questions.length, 2);
    for (const question of challenge.questions) {
      assert.equal(question.choices.filter((choice) => choice.correct).length, 1);
    }
  }
});

test('levels cross the first threshold at 90 XP', () => {
  assert.equal(levelProgress(89).level, 1);
  assert.equal(levelProgress(90).level, 2);
  assert.equal(levelProgress(90).into, 0);
  assert.equal(levelProgress(90).need, 120);
  assert.equal(lessonXp(3), 95);
  assert.equal(challengeXp('easy', 2), 55);
  assert.equal(challengeXp('medium', 2), 85);
  assert.equal(challengeXp('hard', 2), 130);
});

test('lesson XP, locks, streaks, and path bonus', () => {
  const path = pathsById['startup-foundations'];
  let state = freshState({ onboarded: true, interests: ['business'] });
  const locked = applyLessonResult(state, {
    lessonId: path.lessons[1],
    correct: 3,
    total: 3,
    today: '2026-11-09',
  });
  assert.equal(locked.error, 'locked');

  const first = applyLessonResult(state, {
    lessonId: path.lessons[0],
    correct: 3,
    total: 3,
    today: '2026-11-09',
  });
  state = first.state;
  assert.equal(first.award.xpGained, 95);
  assert.equal(first.award.leveledUp, true);
  assert.equal(state.streak, 1);
  assert.ok(state.unlocks['first-step']);
  assert.ok(state.unlocks.perfect);

  const sameDay = applyLessonResult(state, {
    lessonId: path.lessons[1],
    correct: 3,
    total: 3,
    today: '2026-11-09',
  });
  state = sameDay.state;
  assert.equal(state.streak, 1);
  assert.equal(state.activity['2026-11-09'], 190);

  const third = applyLessonResult(state, {
    lessonId: path.lessons[2],
    correct: 3,
    total: 3,
    today: '2026-11-10',
  });
  state = third.state;
  assert.equal(third.award.pathBonus, PATH_BONUS);
  assert.equal(state.xp, 95 * 3 + PATH_BONUS);
  assert.equal(state.streak, 2);
  assert.ok(state.unlocks.pathfinder);
  assert.equal(levelProgress(state.xp).level, 4);

  const retry = applyLessonResult(state, {
    lessonId: path.lessons[0],
    correct: 1,
    total: 3,
    today: '2026-11-12',
  });
  assert.equal(retry.award.xpGained, 0);
  assert.equal(retry.state.xp, state.xp);
  assert.equal(retry.state.lessons[path.lessons[0]].correct, 1);
  assert.equal(retry.state.streak, 1);
  assert.ok(retry.state.unlocks.perfect);
});

test('daily challenges are stable and pay XP once per day', () => {
  const date = parseDateKey('2026-11-09');
  const firstSet = dailyChallenges(date).map((item) => item.id);
  const secondSet = dailyChallenges(date).map((item) => item.id);
  assert.deepEqual(firstSet, secondSet);
  assert.deepEqual(
    dailyChallenges(date).map((item) => item.difficulty),
    ['easy', 'medium', 'hard'],
  );

  const easy = dailyChallenges(date).find((item) => item.difficulty === 'easy');
  let state = freshState({ onboarded: true, interests: ['finance'] });
  const cleared = applyChallengeResult(state, {
    baseId: easy.id,
    correct: 2,
    total: 2,
    today: '2026-11-09',
  });
  state = cleared.state;
  const again = applyChallengeResult(state, {
    baseId: easy.id,
    correct: 0,
    total: 2,
    today: '2026-11-09',
  });
  assert.equal(cleared.award.xpGained, challengeXp(easy.difficulty, 2));
  assert.equal(again.award.alreadyDone, true);
  assert.equal(again.state.xp, state.xp);
  assert.ok(Number.isFinite(state.xp) && state.xp > 0);
  assert.equal(again.state.challenges[challengeInstanceId('2026-11-09', easy.id)].correct, 0);

  let sweep = freshState({ onboarded: true });
  for (const challenge of dailyChallenges(date)) {
    sweep = applyChallengeResult(sweep, {
      baseId: challenge.id,
      correct: 1,
      total: 2,
      today: '2026-11-09',
    }).state;
  }
  assert.ok(sweep.unlocks.trifecta);
  assert.ok(sweep.unlocks.challenger);
});

test('recommendations explain a weak topic and a saved interest', () => {
  const path = pathsById['startup-foundations'];
  const state = applyLessonResult(freshState({ onboarded: true, interests: ['business'] }), {
    lessonId: path.lessons[0],
    correct: 0,
    total: 3,
    today: '2026-11-09',
  }).state;
  const items = recommendations(state, '2026-11-09');
  assert.equal(items[0].title, 'Product-Market Fit in One Idea');
  assert.match(items[0].reason, /Business/);
  assert.match(items[0].reason, /0%/);
  assert.equal(items[1].title, 'Feedback People Can Use');
  assert.match(items[1].reason, /focus/);
});

test('sanitize drops unknown records and ranks the learner by XP', () => {
  const clean = sanitize({
    xp: 99999,
    name: '   ',
    interests: ['finance', 'nope'],
    lessons: { missing: { correct: 1, total: 1, xpAwarded: 80 } },
    streak: 4,
    lastActiveDate: 'nope',
  });
  assert.equal(clean.name, 'Mike');
  assert.deepEqual(clean.interests, ['finance']);
  assert.equal(clean.xp, 0);
  assert.equal(clean.streak, 0);

  const board = leaderboard(freshState());
  assert.equal(board.length, DEMO_LEARNERS.length + 1);
  assert.equal(board.at(-1).you, true);
  assert.equal(board.at(-1).rank, 10);
});
