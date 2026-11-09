import { useState } from 'react';
import { cx } from './ui.jsx';

export function Quiz({ questions, finishLabel, onFinish }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [checked, setChecked] = useState(false);
  const [hint, setHint] = useState('');
  const [log, setLog] = useState([]);

  const question = questions[index];
  const correctChoice = question.choices.find((choice) => choice.correct);
  const pickedChoice = question.choices.find((choice) => choice.id === picked);
  const isCorrect = checked && picked === correctChoice.id;
  const last = index === questions.length - 1;

  function check() {
    if (!picked) {
      setHint('Choose an answer, then check it.');
      return;
    }
    setHint('');
    setChecked(true);
  }

  function continueQuiz() {
    const entry = {
      id: question.id,
      prompt: question.prompt,
      explain: question.explain,
      picked,
      pickedText: pickedChoice?.text || '',
      correctText: correctChoice.text,
      correct: picked === correctChoice.id,
    };
    const nextLog = [...log, entry];
    if (last) {
      onFinish({
        correct: nextLog.filter((item) => item.correct).length,
        total: questions.length,
        review: nextLog,
      });
      return;
    }
    setLog(nextLog);
    setIndex(index + 1);
    setPicked(null);
    setChecked(false);
  }

  return (
    <section className="quiz" aria-labelledby="quiz-prompt">
      <div className="q-head">
        <p className="kicker">
          Question {index + 1} of {questions.length}
        </p>
        <div className="dots" aria-hidden="true">
          {questions.map((item, dotIndex) => (
            <i key={item.id} className={cx(dotIndex < index && 'done', dotIndex === index && 'now')} />
          ))}
        </div>
      </div>
      <h2 id="quiz-prompt">{question.prompt}</h2>
      <div className="choices" role="listbox" aria-label="Answers">
        {question.choices.map((choice) => {
          const selected = picked === choice.id;
          const showCorrect = checked && choice.correct;
          const showWrong = checked && selected && !choice.correct;
          return (
            <button
              key={choice.id}
              type="button"
              className={cx('choice', selected && !checked && 'selected', showCorrect && 'correct', showWrong && 'incorrect')}
              aria-pressed={selected}
              onClick={() => {
                if (checked) return;
                setPicked(choice.id);
                setHint('');
              }}
            >
              <span>{choice.text}</span>
            </button>
          );
        })}
      </div>
      {hint ? (
        <p className="form-error" role="status">
          {hint}
        </p>
      ) : null}
      {checked ? (
        <div className={cx('explain', isCorrect ? 'good' : 'bad')} role="status">
          <strong>{isCorrect ? 'That’s right' : 'Not quite'}</strong>
          <p>{question.explain}</p>
        </div>
      ) : null}
      <div className="btn-row">
        {checked ? (
          <button className="btn btn-primary" type="button" onClick={continueQuiz}>
            {last ? finishLabel : 'Next question'}
          </button>
        ) : (
          <button className="btn btn-primary" type="button" onClick={check}>
            Check answer
          </button>
        )}
      </div>
    </section>
  );
}
