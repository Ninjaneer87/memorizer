import { formatTime } from 'utils/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useTimeContext } from 'context/timeContext';
import { usePlayerContext } from 'context/playerContext';

const GameInfo = () => {
  const { time } = useTimeContext();
  const { player } = usePlayerContext();

  return (
    <div className='flex flex-wrap gap-2 flex-col bg-black/50 p-2 px-3 rounded-xl'>
      <div className='max-w-[200px] truncate' title={player}>
        <FontAwesomeIcon icon={regular('user')} className='text-primary' /> <strong>{player}</strong>
      </div>
      <div className='min-w-[200px]'>
        <FontAwesomeIcon icon={regular('clock')} className='text-primary' /> {formatTime(time)}
      </div>
    </div>
  );
};

export default GameInfo;