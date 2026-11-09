import { useState } from 'react';
import { cx } from '../components/ui.jsx';
import { Icon } from '../components/Icons.jsx';
import { useSkill } from '../context.jsx';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'earned', label: 'Earned' },
  { id: 'open', label: 'In progress' },
];

export function Achievements() {
  const { derived, navigate } = useSkill();
  const [filter, setFilter] = useState('all');
  const shown = derived.achievements.filter((item) => {
    if (filter === 'earned') return Boolean(item.earnedAt);
    if (filter === 'open') return !item.earnedAt;
    return true;
  });
  const earnedCount = derived.achievements.filter((item) => item.earnedAt).length;

  return (
    <div className="stack">
      <header className="page-intro">
        <p className="kicker">
          {earnedCount}/{derived.achievements.length} earned
        </p>
        <h1>Achievements</h1>
        <p className="lede">Milestones stay unlocked once you reach them. Progress bars follow your current streak, XP, and scores.</p>
      </header>
      <div className="chips">
        {FILTERS.map((item) => (
          <button key={item.id} type="button" className={cx('chip', filter === item.id && 'on')} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <div className="card empty">
          <h2>{filter === 'earned' ? 'No milestones earned yet' : 'Everything in this view is earned'}</h2>
          <button className="btn btn-ghost" type="button" onClick={() => setFilter('all')}>
            Show all milestones
          </button>
        </div>
      ) : (
        <div className="achieve-grid">
          {shown.map((item) => {
            const ratio = Math.min(100, Math.round((item.progress.current / item.progress.target) * 100));
            return (
              <article key={item.id} className={cx('achieve-card card', item.earnedAt && 'earned')}>
                <div className="section-head">
                  <strong>{item.title}</strong>
                  {item.earnedAt ? <Icon name="check" size={18} /> : null}
                </div>
                <p>{item.detail}</p>
                <div className="bar-track" aria-hidden="true">
                  <div className="bar-fill" style={{ width: `${item.earnedAt ? 100 : ratio}%` }} />
                </div>
                <p className="muted">{item.earnedAt ? `Earned ${item.earnedAt}` : `${item.progress.current} / ${item.progress.target}`}</p>
                {item.earnedAt ? null : (
                  <button className="btn btn-ghost" type="button" onClick={() => navigate(item.cta.route)}>
                    {item.cta.label}
                  </button>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
