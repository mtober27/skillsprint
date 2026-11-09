import { useEffect } from 'react';

export function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

export function Avatar({ name, size = 42 }) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || '?';
  const hue = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360;
  return (
    <span
      className="avatar"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(145deg, hsl(${hue} 82% 64%), hsl(${(hue + 36) % 360} 78% 46%))`,
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function Ring({ value, label, caption }) {
  const radius = 46;
  const circ = 2 * Math.PI * radius;
  const pct = value == null ? 0 : Math.max(0, Math.min(1, value));
  return (
    <div className="ring">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle className="ring-track" cx="60" cy="60" r={radius} />
        <circle
          className="ring-value"
          cx="60"
          cy="60"
          r={radius}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
        />
      </svg>
      <div className="ring-copy">
        <strong>{label}</strong>
        <span>{caption}</span>
      </div>
    </div>
  );
}

export function WeekChart({ days, activity }) {
  const values = days.map((day) => activity[day.key] || 0);
  const max = Math.max(40, ...values);
  return (
    <div className="chart" role="img" aria-label="Experience points earned on each of the last seven days">
      {days.map((day, index) => {
        const value = values[index];
        const height = value === 0 ? 0 : Math.max(8, (value / max) * 100);
        return (
          <div key={day.key} className={cx('chart-col', day.isToday && 'today')}>
            <div className="chart-bar-wrap">
              <div className="chart-bar" style={{ height: `${height}%` }} />
            </div>
            <span>{day.label}</span>
            <b>{value}</b>
          </div>
        );
      })}
    </div>
  );
}

export function Modal({ title, children, onClose }) {
  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-root">
      <button className="scrim" aria-label="Close dialog" onClick={onClose} />
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="section-head">
          <h2 id="modal-title">{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Toast({ text, onClose }) {
  return (
    <div className="toast" role="status">
      <p>{text}</p>
      <button className="icon-btn" onClick={onClose} aria-label="Dismiss notification">
        ×
      </button>
    </div>
  );
}

export function ReviewList({ review }) {
  return (
    <ol className="review-list">
      {review.map((item, index) => (
        <li key={item.id} className={item.correct ? 'good' : 'bad'}>
          <div className="review-top">
            <span>Question {index + 1}</span>
            <strong>{item.correct ? 'Correct' : 'Not quite'}</strong>
          </div>
          <p>{item.prompt}</p>
          <p className="muted">Your answer: {item.pickedText}</p>
          {item.correct ? null : <p className="muted">Answer: {item.correctText}</p>}
          <p>{item.explain}</p>
        </li>
      ))}
    </ol>
  );
}
