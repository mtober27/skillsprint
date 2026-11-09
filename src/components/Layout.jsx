import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { lessonsById, pathsById } from '../data/catalog.js';
import { challengePool } from '../data/challenges.js';
import { useSkill } from '../context.jsx';
import { Achievements } from '../views/Achievements.jsx';
import { ChallengePlayer, Challenges } from '../views/Challenges.jsx';
import { Dashboard } from '../views/Dashboard.jsx';
import { Discover } from '../views/Discover.jsx';
import { Leaderboard } from '../views/Leaderboard.jsx';
import { LessonView } from '../views/LessonView.jsx';
import { PathView } from '../views/PathView.jsx';
import { Icon } from './Icons.jsx';
import { Avatar, Modal, Toast, cx } from './ui.jsx';

const NAV = [
  { name: 'dashboard', label: 'Home', icon: 'home' },
  { name: 'discover', label: 'Discover', icon: 'compass' },
  { name: 'challenges', label: 'Challenges', icon: 'bolt' },
  { name: 'achievements', label: 'Awards', icon: 'trophy' },
  { name: 'leaderboard', label: 'Board', icon: 'users' },
];

function activeName(route) {
  if (route.name === 'path' || route.name === 'lesson') return 'discover';
  if (route.name === 'challenge') return 'challenges';
  return route.name;
}

function pageTitle(route) {
  if (route.name === 'lesson') return lessonsById[route.lessonId]?.title || 'Lesson';
  if (route.name === 'path') return pathsById[route.pathId]?.title || 'Path';
  if (route.name === 'challenge') return challengePool.find((item) => item.id === route.challengeId)?.title || 'Challenge';
  const labels = {
    dashboard: 'Dashboard',
    discover: 'Discover',
    challenges: 'Daily challenges',
    achievements: 'Achievements',
    leaderboard: 'Leaderboard',
  };
  return labels[route.name] || 'SkillSprint';
}

function routeKey(route) {
  return [route.name, route.pathId, route.lessonId, route.challengeId].filter(Boolean).join(':');
}

export function Layout() {
  const skill = useSkill();
  const { state, derived, route, navigate, toast, levelUp, dismissToast, dismissLevelUp, updateName, reset } = skill;
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [draftName, setDraftName] = useState(state.name);
  const [nameError, setNameError] = useState('');
  const current = activeName(route);
  const mainRef = useRef(null);

  useEffect(() => {
    document.title = `${pageTitle(route)} · SkillSprint`;
    setOpen(false);
  }, [route]);

  useLayoutEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [route]);

  function saveName(event) {
    event.preventDefault();
    const result = updateName(draftName);
    if (result.error) {
      setNameError(result.error);
      return;
    }
    setEditing(false);
  }

  return (
    <div className="shell">
      <a className="skip" href="#content">
        Skip to content
      </a>
      {open ? <button className="scrim nav-scrim" aria-label="Close menu" onClick={() => setOpen(false)} /> : null}
      <aside className={cx('sidebar', open && 'open')}>
        <div className="brand">
          <span className="brand-mark">
            <Icon name="bolt" size={20} />
          </span>
          <div>
            <strong>SkillSprint</strong>
            <p>Learn in sprints</p>
          </div>
        </div>
        <nav className="nav-list" aria-label="Primary">
          {NAV.map((item) => (
            <button
              key={item.name}
              type="button"
              className={cx('nav-item', current === item.name && 'active')}
              aria-current={current === item.name ? 'page' : undefined}
              onClick={() => navigate(item.name)}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="side-card">
          <div className="profile">
            <Avatar name={state.name} />
            <div>
              <strong>{state.name}</strong>
              <p>
                Level {derived.level.level} · {derived.xp.toLocaleString()} XP
              </p>
            </div>
          </div>
          <button
            className="btn btn-ghost btn-full"
            type="button"
            onClick={() => {
              setDraftName(state.name);
              setNameError('');
              setEditing(true);
            }}
          >
            <Icon name="edit" size={16} /> Edit name
          </button>
          <button className="btn btn-text" type="button" onClick={() => setConfirmReset(true)}>
            Reset progress
          </button>
        </div>
      </aside>
      <div className="main" ref={mainRef}>
        <header className="topbar">
          <button className="icon-btn menu-btn" type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Icon name="menu" />
          </button>
          <div className="top-title">
            <p className="kicker">SkillSprint</p>
            <strong>{pageTitle(route)}</strong>
          </div>
          <div className="top-pills">
            <span className="pill">Lv {derived.level.level}</span>
            <span className="pill xp">{derived.xp.toLocaleString()} XP</span>
            <span className="pill streak">
              <Icon name="flame" size={15} /> {state.streak}
            </span>
          </div>
        </header>
        <div className="content" id="content" key={routeKey(route)}>
          <View name={route.name} />
        </div>
      </div>
      <nav className="bottom-nav" aria-label="Primary mobile">
        {NAV.map((item) => (
          <button
            key={item.name}
            type="button"
            className={cx(current === item.name && 'active')}
            aria-current={current === item.name ? 'page' : undefined}
            onClick={() => navigate(item.name)}
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </button>
        ))}
      </nav>
      {toast ? <Toast text={toast.text} onClose={dismissToast} /> : null}
      {levelUp ? (
        <Modal title="Level up" onClose={dismissLevelUp}>
          <div className="level-copy">
            <p className="kicker">New rank</p>
            <p className="level-number">{levelUp.level}</p>
            <p>
              {levelUp.title}. Your XP bar and the sprint board both moved with this clear.
            </p>
            <button className="btn btn-primary btn-full" type="button" onClick={dismissLevelUp}>
              Keep sprinting
            </button>
          </div>
        </Modal>
      ) : null}
      {editing ? (
        <Modal title="Edit name" onClose={() => setEditing(false)}>
          <form className="stack" onSubmit={saveName}>
            <label className="field">
              <span>Name on the board</span>
              <input value={draftName} maxLength={24} autoFocus onChange={(event) => setDraftName(event.target.value)} />
            </label>
            {nameError ? <p className="form-error">{nameError}</p> : null}
            <button className="btn btn-primary" type="submit">
              Save name
            </button>
          </form>
        </Modal>
      ) : null}
      {confirmReset ? (
        <Modal title="Reset progress" onClose={() => setConfirmReset(false)}>
          <p>This clears lessons, challenges, XP, streaks, and achievements stored in this browser.</p>
          <div className="btn-row">
            <button className="btn btn-ghost" type="button" onClick={() => setConfirmReset(false)}>
              Cancel
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => reset()}
            >
              Reset progress
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

function View({ name }) {
  switch (name) {
    case 'discover':
      return <Discover />;
    case 'path':
      return <PathView />;
    case 'lesson':
      return <LessonView />;
    case 'challenges':
      return <Challenges />;
    case 'challenge':
      return <ChallengePlayer />;
    case 'achievements':
      return <Achievements />;
    case 'leaderboard':
      return <Leaderboard />;
    default:
      return <Dashboard />;
  }
}
