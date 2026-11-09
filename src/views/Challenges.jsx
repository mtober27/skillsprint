import { useState } from 'react';
import { topicsById } from '../data/catalog.js';
import { challengePool } from '../data/challenges.js';
import { Quiz } from '../components/Quiz.jsx';
import { Icon } from '../components/Icons.jsx';
import { ReviewList, cx } from '../components/ui.jsx';
import { useSkill } from '../context.jsx';
import { challengeXp } from '../lib/logic.js';

export function Challenges() {
  const { state, derived, navigate } = useSkill();
  const doneToday = derived.daily.filter((item) => item.record).length;
  const history = Object.values(state.challenges).sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

  return (
    <div className="stack">
      <header className="page-intro">
        <p className="kicker">Refreshes at midnight · {countdown(derived.today, new Date())}</p>
        <h1>Daily challenges</h1>
        <p className="lede">
          Three challenges, one of each difficulty. {doneToday}/3 cleared today. Each one pays XP the first time you finish it today.
        </p>
      </header>
      <div className="path-grid">
        {derived.daily.map((challenge) => {
          const topic = topicsById[challenge.topic];
          const max = challengeXp(challenge.difficulty, challenge.questions.length);
          return (
            <article key={challenge.id} className="card challenge-card" style={{ '--tint': topic.tint }}>
              <div className="card-topline">
                <span className={cx('tag', challenge.difficulty)}>{challenge.difficulty}</span>
                <span className="muted">{topic.name}</span>
              </div>
              <h2>{challenge.title}</h2>
              <p>{challenge.intro}</p>
              <p className="muted">
                {challenge.questions.length} questions · up to {max} XP
                {challenge.record ? ` · saved ${challenge.record.correct}/${challenge.record.total}` : ''}
              </p>
              <button className="btn btn-primary" type="button" onClick={() => navigate({ name: 'challenge', challengeId: challenge.id })}>
                {challenge.record ? 'Practice again' : 'Start challenge'}
              </button>
            </article>
          );
        })}
      </div>
      <section className="card">
        <div className="section-head">
          <div>
            <p className="kicker">Log</p>
            <h2>Cleared challenges</h2>
          </div>
        </div>
        {history.length === 0 ? (
          <p className="muted">Finish today’s easy, medium, or hard challenge and it will show up here.</p>
        ) : (
          <ul className="history-list">
            {history.slice(0, 8).map((item) => (
              <li key={`${item.date}-${item.baseId}`}>
                <span className={cx('tag', item.difficulty)}>{item.difficulty}</span>
                <span>
                  <strong>{item.title}</strong>
                  <small>
                    {item.date} · {item.correct}/{item.total} · {item.xpAwarded} XP
                  </small>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export function ChallengePlayer() {
  const { route, derived, navigate, completeChallenge } = useSkill();
  const challenge = derived.daily.find((item) => item.id === route.challengeId) || challengePool.find((item) => item.id === route.challengeId);
  const inToday = derived.daily.some((item) => item.id === route.challengeId);
  const [attempt, setAttempt] = useState(0);
  const [summary, setSummary] = useState(null);

  if (!challenge || !inToday) {
    return (
      <div className="card empty">
        <h1>This challenge is not in today’s set</h1>
        <p className="muted">The daily trio changes with the date. Today’s three are waiting on the challenge board.</p>
        <button className="btn btn-primary" type="button" onClick={() => navigate('challenges')}>
          See today’s challenges
        </button>
      </div>
    );
  }

  const topic = topicsById[challenge.topic];

  function finish(result) {
    const applied = completeChallenge({
      baseId: challenge.id,
      correct: result.correct,
      total: result.total,
    });
    if (applied.error) return;
    setSummary({ ...result, award: applied.award });
  }

  return (
    <div className="stack">
      <button className="btn btn-text" type="button" onClick={() => navigate('challenges')}>
        <Icon name="back" size={18} /> Today’s challenges
      </button>
      {summary ? (
        <section className="card stack">
          <p className="kicker">{challenge.difficulty}</p>
          <h1>
            {summary.correct}/{summary.total} on {challenge.title}
          </h1>
          <p className="lede">{summary.award.alreadyDone ? 'Practice score saved for today.' : `You earned ${summary.award.xpGained} XP.`}</p>
          <ReviewList review={summary.review} />
          <div className="btn-row">
            <button className="btn btn-primary" type="button" onClick={() => navigate('challenges')}>
              Back to today’s set
            </button>
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => {
                setSummary(null);
                setAttempt((value) => value + 1);
              }}
            >
              Practice again
            </button>
          </div>
        </section>
      ) : (
        <section className="card">
          <p className="kicker" style={{ color: topic.tint }}>
            {topic.name} · {challenge.difficulty} · up to {challengeXp(challenge.difficulty, challenge.questions.length)} XP
          </p>
          <h1>{challenge.title}</h1>
          <p className="lede">{challenge.intro}</p>
          <Quiz key={`${challenge.id}-${attempt}`} questions={challenge.questions} finishLabel="See results" onFinish={finish} />
        </section>
      )}
    </div>
  );
}

function countdown(todayKey, now) {
  const [year, month, day] = todayKey.split('-').map(Number);
  const midnight = new Date(year, month - 1, day + 1);
  const ms = Math.max(0, midnight - now);
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  return `${hours}h ${minutes}m left`;
}
