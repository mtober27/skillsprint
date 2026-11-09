import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  ROUTE_KEY,
  STORAGE_KEY,
  applyChallengeResult,
  applyLessonResult,
  buildDerived,
  describeAward,
  freshState,
  rankTitle,
  sanitize,
  sanitizeRoute,
} from './lib/logic.js';

const SkillContext = createContext(null);

export function SkillProvider({ children }) {
  const [state, setState] = useState(freshState);
  const [ready, setReady] = useState(false);
  const [route, setRoute] = useState({ name: 'dashboard' });
  const [toast, setToast] = useState(null);
  const [levelUp, setLevelUp] = useState(null);
  const [now, setNow] = useState(() => new Date());
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(sanitize(JSON.parse(raw)));
    } catch {
      setState(freshState());
    }
    try {
      const saved = sessionStorage.getItem(ROUTE_KEY);
      if (saved) setRoute(sanitizeRoute(JSON.parse(saved)));
    } catch {
      setRoute({ name: 'dashboard' });
    }
    setReady(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem(ROUTE_KEY, JSON.stringify(route));
    } catch {
      /* Session storage can be blocked. Progress still lives in localStorage. */
    }
  }, [ready, route]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 4600);
    return () => clearTimeout(timer);
  }, [toast]);

  const derived = useMemo(() => buildDerived(state, now), [state, now]);

  function commit(next) {
    const clean = sanitize(next);
    stateRef.current = clean;
    setState(clean);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    } catch {
      /* Private mode can reject writes. The session still works in memory. */
    }
    return clean;
  }

  function noteAward(award) {
    if (!award) return;
    setToast({ id: Date.now(), text: describeAward(award) });
    if (award.leveledUp) {
      setLevelUp({ level: award.levelAfter, title: rankTitle(award.levelAfter) });
    }
  }

  function navigate(next) {
    setRoute(sanitizeRoute(typeof next === 'string' ? { name: next } : next));
  }

  function completeLesson(payload) {
    const result = applyLessonResult(stateRef.current, payload);
    if (!result.error) {
      commit(result.state);
      noteAward(result.award);
    }
    return result;
  }

  function completeChallenge(payload) {
    const result = applyChallengeResult(stateRef.current, payload);
    if (!result.error) {
      commit(result.state);
      noteAward(result.award);
    }
    return result;
  }

  function onboard({ name, interests }) {
    const cleanName = name.trim().slice(0, 24);
    if (!cleanName) return { error: 'Add a name so the board knows who is sprinting.' };
    if (!interests.length) return { error: 'Choose at least one topic. Recommendations use that focus.' };
    commit({ ...stateRef.current, name: cleanName, interests, onboarded: true });
    setRoute({ name: 'dashboard' });
    return { ok: true };
  }

  function updateName(name) {
    const cleanName = name.trim().slice(0, 24);
    if (!cleanName) return { error: 'Enter a name to show on the board.' };
    commit({ ...stateRef.current, name: cleanName });
    return { ok: true };
  }

  function setInterests(interests) {
    commit({ ...stateRef.current, interests });
  }

  function reset() {
    commit(freshState());
    setRoute({ name: 'dashboard' });
    setToast(null);
    setLevelUp(null);
  }

  const value = {
    ready,
    state,
    derived,
    now,
    route,
    toast,
    levelUp,
    navigate,
    completeLesson,
    completeChallenge,
    onboard,
    updateName,
    setInterests,
    reset,
    dismissToast: () => setToast(null),
    dismissLevelUp: () => setLevelUp(null),
  };

  return <SkillContext.Provider value={value}>{children}</SkillContext.Provider>;
}

export function useSkill() {
  const value = useContext(SkillContext);
  if (!value) throw new Error('useSkill must be used within SkillProvider');
  return value;
}
