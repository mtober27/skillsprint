import { useState } from 'react';
import { lessonsById, pathsById, topicsById } from '../data/catalog.js';
import { Quiz } from '../components/Quiz.jsx';
import { Icon } from '../components/Icons.jsx';
import { ReviewList } from '../components/ui.jsx';
import { useSkill } from '../context.jsx';
import { PATH_BONUS, lessonStatus, lessonXp } from '../lib/logic.js';

export function LessonView() {
  const { route, state, navigate, completeLesson } = useSkill();
  const lesson = lessonsById[route.lessonId];
  const [phase, setPhase] = useState('read');
  const [attempt, setAttempt] = useState(0);
  const [summary, setSummary] = useState(null);

  if (!lesson) {
    return (
      <div className="card empty">
        <h1>That lesson is not in the catalog</h1>
        <button className="btn btn-primary" type="button" onClick={() => navigate('discover')}>
          Browse paths
        </button>
      </div>
    );
  }

  const path = pathsById[lesson.pathId];
  const topic = topicsById[path.topic];
  const status = lessonStatus(state, lesson.id);
  const record = state.lessons[lesson.id];
  const perfect = lessonXp(lesson.questions.length);
  const isFinale = path.lessons[path.lessons.length - 1] === lesson.id;
  const nextId = path.lessons[status.index + 1];

  function finish(result) {
    const applied = completeLesson({
      lessonId: lesson.id,
      correct: result.correct,
      total: result.total,
    });
    if (applied.error) return;
    setSummary({ ...result, award: applied.award });
    setPhase('done');
  }

  return (
    <div className="stack lesson-shell">
      <button className="btn btn-text" type="button" onClick={() => navigate({ name: 'path', pathId: path.id })}>
        <Icon name="back" size={18} /> {path.title}
      </button>

      {status.locked ? (
        <section className="card empty">
          <p className="kicker">{topic.name}</p>
          <h1>{lesson.title}</h1>
          <p>This lesson opens after {lessonsById[status.prevId].title}.</p>
          <button className="btn btn-primary" type="button" onClick={() => navigate({ name: 'lesson', lessonId: status.prevId })}>
            Go to the previous lesson
          </button>
        </section>
      ) : null}

      {!status.locked && phase === 'read' ? (
        <article className="card prose">
          <p className="kicker" style={{ color: topic.tint }}>
            {topic.name} · {lesson.minutes} min
          </p>
          <h1>{lesson.title}</h1>
          <p className="objective">{lesson.objective}</p>
          {record ? (
            <p className="banner good">
              Completed · saved score {record.correct}/{record.total}. A replay updates accuracy. The original {record.xpAwarded} XP stays banked.
            </p>
          ) : null}
          {lesson.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <aside className="example">
            <span className="kicker">Example</span>
            <h2>{lesson.example.title}</h2>
            <p>{lesson.example.body}</p>
          </aside>
          <aside className="takeaway">
            <span className="kicker">Takeaway</span>
            <p>{lesson.takeaway}</p>
          </aside>
          <p className="muted">
            The quiz pays 20 XP plus 25 XP for each correct answer. A perfect score is {perfect} XP.
            {isFinale && !state.pathBonuses[path.id] ? ` Finishing this path also adds ${PATH_BONUS} XP.` : ''}
          </p>
          <button className="btn btn-primary" type="button" onClick={() => setPhase('quiz')}>
            {record ? 'Practice the quiz' : 'Start the quiz'}
          </button>
        </article>
      ) : null}

      {!status.locked && phase === 'quiz' ? (
        <div className="card">
          <p className="kicker">{lesson.title}</p>
          <Quiz key={attempt} questions={lesson.questions} finishLabel="See results" onFinish={finish} />
        </div>
      ) : null}

      {!status.locked && phase === 'done' && summary ? (
        <section className="card stack">
          <p className="kicker">Results</p>
          <h1>
            {summary.correct}/{summary.total} correct
          </h1>
          <p className="lede">{summary.award.alreadyDone ? 'Practice score saved.' : `You earned ${summary.award.xpGained} XP.`}</p>
          <ul className="award-list">
            <li>{summary.award.alreadyDone ? 'First-clear XP stays banked.' : `+${summary.award.lessonXp} XP from this quiz`}</li>
            {summary.award.pathBonus ? <li>+{summary.award.pathBonus} XP for completing {summary.award.pathTitle}</li> : null}
            {summary.award.newUnlocks?.length ? (
              <li>Unlocked {summary.award.newUnlocks.map((item) => item.title).join(', ')}</li>
            ) : null}
          </ul>
          <ReviewList review={summary.review} />
          <div className="btn-row">
            {nextId ? (
              <button className="btn btn-primary" type="button" onClick={() => navigate({ name: 'lesson', lessonId: nextId })}>
                Next lesson
              </button>
            ) : (
              <button className="btn btn-primary" type="button" onClick={() => navigate({ name: 'path', pathId: path.id })}>
                Back to path
              </button>
            )}
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => {
                setAttempt((value) => value + 1);
                setSummary(null);
                setPhase('quiz');
              }}
            >
              Practice again
            </button>
            {nextId ? (
              <button className="btn btn-text" type="button" onClick={() => navigate({ name: 'path', pathId: path.id })}>
                Path overview
              </button>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
