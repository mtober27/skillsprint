import { Avatar, cx } from '../components/ui.jsx';
import { useSkill } from '../context.jsx';

export function Leaderboard() {
  const { derived, navigate } = useSkill();
  const you = derived.board.find((row) => row.you);

  return (
    <div className="stack">
      <header className="page-intro">
        <p className="kicker">Ranked by lifetime XP</p>
        <h1>Sprint board</h1>
        <p className="lede">
          You are #{you.rank} with {you.xp.toLocaleString()} XP. The other learners are a fixed demo board, so your rank can climb as you finish lessons and challenges on this device.
        </p>
        <button className="btn btn-primary" type="button" onClick={() => navigate('discover')}>
          Earn XP
        </button>
      </header>
      <ol className="board">
        {derived.board.map((row) => (
          <li key={row.id} className={cx('board-row card', row.you && 'you')}>
            <span className={cx('medal', row.rank < 4 && `medal-${row.rank}`)}>{row.rank}</span>
            <Avatar name={row.name} />
            <span>
              <strong>{row.you ? `${row.name} (you)` : row.name}</strong>
              <small>{row.role}</small>
            </span>
            <em>{row.xp.toLocaleString()} XP</em>
          </li>
        ))}
      </ol>
    </div>
  );
}
