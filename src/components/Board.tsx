import { useCardContext } from "context/cardContext";
import Card from "./Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useGameContext } from "context/gameContext";
import { formatTime } from "utils/utility";
import { useNavigate } from "react-router-dom";

const Board = () => {
  const { cards, flipCard, loadingImages } = useCardContext();
  const { isGameOver, time, newGame } = useGameContext();
  const navigate = useNavigate();

  const handleScoreBoards = () => navigate('scores');

  if (loadingImages)
    return (
      <div className="pulse text-center mx-auto my-20 text-4xl">
        <FontAwesomeIcon icon={solid('gears')} /> LOADING...
      </div>
    );

  return (
    <div className="mt-8 grid grid-cols-4 max-w-[800px] mx-auto gap-2 sm:gap-4 relative">
      {
        isGameOver
          ? <div
            style={{ animationDelay: '.5s' }}
            className="blur-in backdrop-blur-sm absolute inset-2 md:inset-4 rounded-xl bg-black/70 flex justify-center items-center text-center"
          >
            <div className="flex flex-col items-center p-4 gap-4 text-xl sm:text-4xl">
              <FontAwesomeIcon icon={solid('trophy')} className='text-primary' />
              <div className="flex flex-wrap justify-center gap-2">
                You won in <span className="text-primary">{formatTime(time)}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={newGame} className="text-secondary text-base">
                  Play again <FontAwesomeIcon icon={solid('repeat')} />
                </button>
                <button onClick={handleScoreBoards} className="text-secondary text-base">
                  Score board <FontAwesomeIcon icon={solid('ranking-star')} />
                </button>
              </div>
            </div>
          </div>
          : null
      }

      {cards.map(({ image, isOpen, isPaired, id, notMatching }, i) => (
        <Card
          key={id}
          image={image}
          notMatching={notMatching}
          id={id}
          isOpen={isOpen}
          isPaired={isPaired}
          handleFlip={flipCard}
          animationDelay={isGameOver ? 0 : i * 100}
        />
      ))
      }
    </div>
  );
};

export default Board;