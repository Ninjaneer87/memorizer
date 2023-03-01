import { usePlayerContext } from 'context/playerContext';
import { useGameContext } from 'context/gameContext';
import { formatTime } from 'utils/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const GameControls = () => {
  const { player, setPlayer } = usePlayerContext();
  const { time, newGame, start, isGameOver, stop } = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isGameOver && !!player) start();
  }, [start, isGameOver, player]);

  const handleLogout = () => {
    stop();
    setPlayer('');
  }

  const handleScores = () => {
    navigate('scores');
  }

  return (
    <div className='flex flex-wrap gap-4 items-start justify-between max-sm:items-center max-sm:flex-col'>
      <div className='flex flex-wrap gap-2 flex-col'>
        <div className='max-w-[200px] truncate' title={player}>
          <FontAwesomeIcon icon={regular('user')} className='text-primary' /> <strong>{player}</strong>
        </div>
        <div className='min-w-[200px]'>
          <FontAwesomeIcon icon={regular('clock')} className='text-primary' /> {formatTime(time)}
        </div>
      </div>

      <div className='flex flex-wrap gap-4'>
        <button onClick={handleScores} className='text-secondary uppercase flex flex-col justify-center items-center gap-2 min-w-[80px]'>
          <FontAwesomeIcon className='text-xl' icon={solid('ranking-star')} />
          <span className='text-xs'>High score</span>
        </button>
        <button onClick={newGame} className='text-secondary uppercase flex flex-col justify-center items-center gap-2 min-w-[80px]'>
          <FontAwesomeIcon className='text-xl' icon={solid('repeat')} />
          <span className='text-xs'>New game</span>
        </button>
        <button onClick={handleLogout} className='text-secondary uppercase flex flex-col justify-center items-center gap-2 min-w-[80px]'>
          <FontAwesomeIcon className='text-xl' icon={solid('arrow-right-from-bracket')} />
          <span className='text-xs'>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default GameControls;