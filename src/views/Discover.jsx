import { useMemo, useState } from 'react';
import { lessonsById, pathMinutes, paths, topics, topicsById } from '../data/catalog.js';
import { Icon } from '../components/Icons.jsx';
import { cx } from '../components/ui.jsx';
import { useSkill } from '../context.jsx';

export function Discover() {
  const { state, setInterests, navigate } = useSkill();
  const [topic, setTopic] = useState('all');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return paths.filter((path) => {
      if (topic !== 'all' && path.topic !== topic) return false;
      if (!needle) return true;
      const titles = path.lessons.map((id) => lessonsById[id].title).join(' ');
      return `${path.title} ${path.summary} ${titles}`.toLowerCase().includes(needle);
    });
  }, [query, topic]);

  function toggleInterest(id) {
    const next = state.interests.includes(id)
      ? state.interests.filter((item) => item !== id)
      : [...state.interests, id];
    setInterests(next);
  }

  return (
    <div className="stack">
      <header className="page-intro">
        <p className="kicker">Catalog</p>
        <h1>Discover a path</h1>
        <p className="lede">Twelve paths across six fields. Lessons inside a path unlock in order.</p>
      </header>

      <section className="card focus-card">
        <div className="section-head">
          <div>
            <p className="kicker">Your focus</p>
            <h2>Interests saved on this device</h2>
          </div>
        </div>
        <div className="chips">
          {topics.map((item) => {
            const on = state.interests.includes(item.id);
            return (
              <button key={item.id} type="button" className={cx('chip', on && 'on')} aria-pressed={on} onClick={() => toggleInterest(item.id)}>
                {on ? <Icon name="check" size={14} /> : null}
                {item.name}
              </button>
            );
          })}
        </div>
        <p className="muted">
          {state.interests.length
            ? 'Recommendations prefer unfinished work in these fields.'
            : 'Choose at least one field if you want recommendations to prefer it.'}
        </p>
      </section>

      <div className="filters">
        <label className="field search-field">
          <span className="sr-only">Search paths and lessons</span>
          <Icon name="search" size={18} />
          <input
            value={query}
            placeholder="Search paths and lessons"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="chips" role="tablist" aria-label="Filter by topic">
          <button type="button" className={cx('chip', topic === 'all' && 'on')} aria-pressed={topic === 'all'} onClick={() => setTopic('all')}>
            All
          </button>
          {topics.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cx('chip', topic === item.id && 'on')}
              aria-pressed={topic === item.id}
              onClick={() => setTopic(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="card empty">
          <h2>No paths match that search</h2>
          <p className="muted">Try another word, or clear the filters to see the full catalog.</p>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => {
              setQuery('');
              setTopic('all');
            }}
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="path-grid">
          {visible.map((path) => {
            const topicMeta = topicsById[path.topic];
            const done = path.lessons.filter((id) => state.lessons[id]).length;
            return (
              <button
                key={path.id}
                type="button"
                className="path-card card"
                style={{ '--tint': topicMeta.tint }}
                onClick={() => navigate({ name: 'path', pathId: path.id })}
              >
                <div className="card-topline">
                  <span className="tag">{topicMeta.name}</span>
                  <span className="muted">{path.level}</span>
                </div>
                <span className="card-title">{path.title}</span>
                <span className="card-copy">{path.summary}</span>
                <div className="bar-track" aria-hidden="true">
                  <div className="bar-fill" style={{ width: `${(done / path.lessons.length) * 100}%` }} />
                </div>
                <div className="card-foot">
                  <span>
                    {done}/{path.lessons.length} lessons · {pathMinutes(path)} min
                  </span>
                  <span className="text-link">
                    {done ? 'Continue' : 'Open'} <Icon name="arrow" size={16} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
