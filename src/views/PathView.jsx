import { useState } from 'react';
import { lessonsById, pathMinutes, pathsById, topicsById } from '../data/catalog.js';
import { Icon } from '../components/Icons.jsx';
import { cx } from '../components/ui.jsx';
import { useSkill } from '../context.jsx';
import { lessonStatus } from '../lib/logic.js';

export function PathView() {
  const { route, state, navigate } = useSkill();
  const path = pathsById[route.pathId];
  const [notice, setNotice] = useState('');

  if (!path) {
    return (
      <div className="card empty">
        <h1>That path is not in the catalog</h1>
        <button className="btn btn-primary" type="button" onClick={() => navigate('discover')}>
          Back to Discover
        </button>
      </div>
    );
  }

  const topic = topicsById[path.topic];
  const done = path.lessons.filter((id) => state.lessons[id]).length;

  function openLesson(lessonId) {
    const status = lessonStatus(state, lessonId);
    if (status.locked) {
      const previous = lessonsById[status.prevId];
      setNotice(`Finish “${previous.title}” to unlock this lesson.`);
      return;
    }
    navigate({ name: 'lesson', lessonId });
  }

  return (
    <div className="stack">
      <button className="btn btn-text" type="button" onClick={() => navigate('discover')}>
        <Icon name="back" size={18} /> All paths
      </button>
      <header className="page-intro">
        <p className="kicker" style={{ color: topic.tint }}>
          {topic.name} · {path.level}
        </p>
        <h1>{path.title}</h1>
        <p className="lede">{path.summary}</p>
        <div className="xp-row">
          <div className="xp-track">
            <div className="xp-fill" style={{ width: `${(done / path.lessons.length) * 100}%`, background: topic.tint }} />
          </div>
          <span>
            {done}/{path.lessons.length} · {pathMinutes(path)} min
          </span>
        </div>
      </header>
      {notice ? (
        <p className="banner warn" role="status">
          {notice}
        </p>
      ) : null}
      <ol className="lesson-list">
        {path.lessons.map((lessonId, index) => {
          const lesson = lessonsById[lessonId];
          const status = lessonStatus(state, lessonId);
          const record = state.lessons[lessonId];
          return (
            <li key={lessonId}>
              <button type="button" className={cx('lesson-item card', status.done && 'done', status.locked && 'locked')} onClick={() => openLesson(lessonId)}>
                <span className="lesson-index">{status.done ? <Icon name="check" size={16} /> : status.locked ? <Icon name="lock" size={16} /> : index + 1}</span>
                <span>
                  <strong>{lesson.title}</strong>
                  <small>
                    {lesson.minutes} min · {lesson.questions.length} questions
                    {record ? ` · saved ${record.correct}/${record.total}` : status.locked ? ' · finish the previous lesson' : ''}
                  </small>
                </span>
                <em>{status.done ? 'Review' : status.locked ? 'Locked' : 'Start'}</em>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
