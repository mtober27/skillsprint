import { Icon } from './components/Icons.jsx';
import { Layout } from './components/Layout.jsx';
import { SkillProvider, useSkill } from './context.jsx';
import { Onboarding } from './views/Onboarding.jsx';

export default function App() {
  return (
    <SkillProvider>
      <Shell />
    </SkillProvider>
  );
}

function Shell() {
  const { ready, state } = useSkill();
  if (!ready) {
    return (
      <div className="splash" role="status">
        <span className="brand-mark">
          <Icon name="bolt" size={22} />
        </span>
        <p>SkillSprint</p>
      </div>
    );
  }
  if (!state.onboarded) return <Onboarding />;
  return <Layout />;
}
