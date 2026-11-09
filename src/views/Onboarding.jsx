import { useState } from 'react';
import { topics } from '../data/catalog.js';
import { Icon } from '../components/Icons.jsx';
import { cx } from '../components/ui.jsx';
import { useSkill } from '../context.jsx';

export function Onboarding() {
  const { onboard } = useSkill();
  const [name, setName] = useState('Mike');
  const [picked, setPicked] = useState(['technology', 'finance']);
  const [error, setError] = useState('');

  function toggle(id) {
    setPicked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
    setError('');
  }

  function start(event) {
    event.preventDefault();
    const result = onboard({ name, interests: picked });
    if (result.error) setError(result.error);
  }

  return (
    <main className="onboard">
      <form className="onboard-panel" onSubmit={start}>
        <div className="brand">
          <span className="brand-mark">
            <Icon name="bolt" size={22} />
          </span>
          <div>
            <strong>SkillSprint</strong>
            <p className="muted">Short lessons. Real quizzes. A board that remembers.</p>
          </div>
        </div>
        <h1>Pick the fields you want to sprint through.</h1>
        <p className="lede">
          Your focus steers the next-step recommendations. Lessons, scores, streaks, and XP stay in this browser.
        </p>
        <label className="field">
          <span>Name on the board</span>
          <input value={name} maxLength={24} autoComplete="nickname" onChange={(event) => setName(event.target.value)} />
        </label>
        <div className="topic-grid">
          {topics.map((topic) => {
            const on = picked.includes(topic.id);
            return (
              <button
                key={topic.id}
                type="button"
                className={cx('topic-card', on && 'on')}
                style={{ '--tint': topic.tint }}
                aria-pressed={on}
                onClick={() => toggle(topic.id)}
              >
                <span className="topic-check">{on ? <Icon name="check" size={16} /> : null}</span>
                <strong>{topic.name}</strong>
                <span>{topic.blurb}</span>
              </button>
            );
          })}
        </div>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : (
          <p className="muted">{picked.length} focus {picked.length === 1 ? 'area' : 'areas'} selected.</p>
        )}
        <button className="btn btn-primary btn-full" type="submit">
          Start sprinting
        </button>
      </form>
    </main>
  );
}
