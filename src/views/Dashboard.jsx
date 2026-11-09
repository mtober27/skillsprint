import { topicsById } from '../data/catalog.js';
import { Icon } from '../components/Icons.jsx';
import { Ring, WeekChart, cx } from '../components/ui.jsx';
import { useSkill } from '../context.jsx';
import { formatPercent } from '../lib/logic.js';

export function Dashboard() {
  const { state, derived, navigate } = useSkill();
  const next = derived.continueItem;
  const earned = derived.achievements.filter((item) => item.earnedAt);
  const preview = [...derived.achievements]
    .sort((a, b) => Number(Boolean(b.earnedAt)) - Number(Boolean(a.earnedAt)) || b.progress.current / b.progress.target - a.progress.current / a.progress.target)
    .slice(0, 3);
  const toNext = derived.level.need - derived.level.into;

  return (
    <div className="stack">
      <section className="hero card">
        <div>
          <p className="kicker">{derived.greeting}</p>
          <h1>{state.name}</h1>
          <p className="lede">
            Level {derived.level.level} · {derived.title}. {toNext} XP reaches level {derived.level.level + 1}.
          </p>
          <div className="xp-row" aria-label={`Level progress ${derived.level.pct}%`}>
            <div className="xp-track">
              <div className="xp-fill" style={{ width: `${derived.level.pct}%` }} />
            </div>
            <span>
              {derived.level.into} / {derived.level.need} XP
            </span>
          </div>
          {next ? (
            <div className="hero-action">
              <button className="btn btn-primary" type="button" onClick={() => navigate(next.route)}>
                {next.kind === 'lesson' ? 'Continue lesson' : next.kind === 'challenge' ? 'Open challenge' : 'Review paths'}
                <Icon name="arrow" size={18} />
              </button>
              <p>{next.reason}</p>
            </div>
          ) : null}
        </div>
        <Ring
          value={derived.snapshot.accuracy}
          label={formatPercent(derived.snapshot.accuracy)}
          caption={derived.snapshot.answers ? 'Accuracy' : 'No answers yet'}
        />
      </section>

      <section className="stat-grid">
        <Stat label="Lessons" value={`${derived.snapshot.lessonsDone}/${derived.snapshot.lessonCount}`} />
        <Stat label="Accuracy" value={formatPercent(derived.snapshot.accuracy)} />
        <Stat label="Streak" value={`${state.streak} day${state.streak === 1 ? '' : 's'}`} />
        <Stat label="Board rank" value={`#${derived.rank}`} />
      </section>

      <section className="split">
        <article className="card">
          <div className="section-head">
            <div>
              <p className="kicker">This week</p>
              <h2>XP by day</h2>
            </div>
            <span className="pill">
              <Icon name="flame" size={16} /> {state.streak}
            </span>
          </div>
          <WeekChart days={derived.days} activity={state.activity} />
          <p className="muted">A day counts when you finish a lesson or a daily challenge. The bar is XP earned that day.</p>
        </article>
        <article className="card">
          <div className="section-head">
            <div>
              <p className="kicker">Today</p>
              <h2>Daily set</h2>
            </div>
            <button className="btn btn-text" type="button" onClick={() => navigate('challenges')}>
              Open
            </button>
          </div>
          <div className="mini-list">
            {derived.daily.map((challenge) => (
              <button key={challenge.id} className="mini-row" type="button" onClick={() => navigate({ name: 'challenge', challengeId: challenge.id })}>
                <span className={cx('tag', challenge.difficulty)}>{challenge.difficulty}</span>
                <span>
                  <strong>{challenge.title}</strong>
                  <small>{challenge.record ? `${challenge.record.correct}/${challenge.record.total} saved` : 'Open'}</small>
                </span>
                <Icon name={challenge.record ? 'check' : 'arrow'} size={16} />
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="card">
        <div className="section-head">
          <div>
            <p className="kicker">By topic</p>
            <h2>Lesson progress</h2>
          </div>
          <button className="btn btn-text" type="button" onClick={() => navigate('discover')}>
            Edit focus
          </button>
        </div>
        <div className="topic-bars">
          {derived.topics.map((topic) => (
            <div key={topic.id} className="bar-row">
              <div className="bar-label">
                <strong>{topic.name}</strong>
                <span>
                  {topic.done}/{topic.available}
                </span>
              </div>
              <div className="bar-track" aria-hidden="true">
                <div className="bar-fill" style={{ width: `${(topic.done / topic.available) * 100}%`, background: topic.tint }} />
              </div>
              <em>{topic.accuracy == null ? 'No quiz yet' : formatPercent(topic.accuracy)}</em>
            </div>
          ))}
        </div>
        <p className="muted">
          Overall accuracy uses the latest score on each lesson and each daily challenge.
          {state.interests.length
            ? ` Focus: ${state.interests.map((id) => topicsById[id].name).join(', ')}.`
            : ' Add a focus on Discover to steer recommendations.'}
        </p>
      </section>

      <section>
        <div className="section-head">
          <div>
            <p className="kicker">Next</p>
            <h2>Recommended for you</h2>
          </div>
        </div>
        <p className="muted recommend-note">
          These picks come from your saved interests, unfinished lessons, and quiz accuracy on this device.
        </p>
        <div className="rec-list">
          {derived.recommendations.map((item) => (
            <button key={item.dedupe} className="rec card" type="button" onClick={() => navigate(item.route)}>
              <span className="kicker">{item.eyebrow}</span>
              <strong>{item.title}</strong>
              <span className="rec-copy">{item.reason}</span>
              <span className="text-link">
                Open <Icon name="arrow" size={16} />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <p className="kicker">{earned.length} earned</p>
            <h2>Milestones</h2>
          </div>
          <button className="btn btn-text" type="button" onClick={() => navigate('achievements')}>
            View all
          </button>
        </div>
        <div className="achieve-grid compact">
          {preview.map((item) => (
            <article key={item.id} className={cx('achieve-card card', item.earnedAt && 'earned')}>
              <div className="section-head">
                <strong>{item.title}</strong>
                {item.earnedAt ? <Icon name="check" size={16} /> : null}
              </div>
              <p>{item.detail}</p>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    width: `${Math.min(100, (item.progress.current / item.progress.target) * 100)}%`,
                  }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <article className="stat card">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
