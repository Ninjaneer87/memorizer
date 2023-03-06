import { usePlayerContext } from 'context/playerContext';
import { useGameContext } from 'context/gameContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from 'react-router-dom';

const GameControls = () => {
  const { setPlayer } = usePlayerContext();
  const { newGame, stopTime } = useGameContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    stopTime();
    setPlayer('');
  }

  const handleScoreBoard = () => {
    navigate('scores');
  }

  return (
    <div className='flex flex-wrap gap-1  bg-black/50 p-2 rounded-xl'>
      <button onClick={newGame} className='text-secondary uppercase flex flex-col justify-center items-center gap-2 min-w-[80px]'>
        <FontAwesomeIcon className='text-xl' icon={solid('repeat')} />
        <span className='text-xs'>New game</span>
      </button>
      <button onClick={handleScoreBoard} className='text-secondary uppercase flex flex-col justify-center items-center gap-2 min-w-[80px]'>
        <FontAwesomeIcon className='text-xl' icon={solid('ranking-star')} />
        <span className='text-xs'>Score board</span>
      </button>
      <button onClick={handleLogout} className='text-secondary uppercase flex flex-col justify-center items-center gap-2 min-w-[80px]'>
        <FontAwesomeIcon className='text-xl' icon={solid('arrow-right-from-bracket')} />
        <span className='text-xs'>Logout</span>
      </button>
    </div>
  );
};

export default GameControls;