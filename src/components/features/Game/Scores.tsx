import ClientOnlyPortal from "components/shared/utility/ClientOnlyPortal";
import { useGameContext } from "context/gameContext";
import { useScoreContext } from "context/scoreContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { formatTime } from "utils/utility";
import { usePlayerContext } from "context/playerContext";

const Scores = () => {
  const [closing, setClosing] = useState(false);
  const navigate = useNavigate();
  const { pause, start, isGameOver } = useGameContext();
  const { scores } = useScoreContext();
  const { player } = usePlayerContext();

  useEffect(() => {
    if (!isGameOver) pause();

    return () => {
      if (!isGameOver) start()
    };
  }, [pause, start, isGameOver])

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      navigate('/game');
    }, 300);
  }

  return (
    <ClientOnlyPortal>
      <div
        onClick={handleClose}
        style={{animationDuration: '150ms'}}
        className={`p-4 blur-in fixed inset-0 bg-black/50 backdrop-blur-lg grid place-items-center ${closing ? 'blur-out' : ''}`}
      >
        <div
          onClick={e => e.stopPropagation()}
          className="w-full max-w-[500px] max-h-[80vh] p-4 bg-bg rounded-xl overflow-y-auto"
        >
          <h2 className="text-center">Fastest memorizers</h2>
          {
            scores.length
              ? scores.map((score, i) => (
                <div
                  key={score.player}
                  className={`blur-in py-2 flex flex-wrap justify-between border border-solid border-transparent border-b-border my-2 gap-2 ${player === score.player ? 'font-extrabold' : 'opacity-50'}`}
                  style={{ animationDelay: `${(i + 1) * 100}ms` }}
                >
                  <div className="flex">
                    <span className="text-primary mr-2">({i + 1})</span>
                    <span className={`block max-w-[150px] truncate`}>
                      {score.player}
                    </span>
                  </div>
                  <span className="text-secondary ml-auto">
                    {formatTime(score.time)}
                  </span>
                </div>
              ))
              : <div className="py-4 text-center">
                <FontAwesomeIcon icon={solid('circle-info')} className='text-primary' /> No records yet
              </div>
          }
        </div>
      </div>
    </ClientOnlyPortal>
  );
};

export default Scores;