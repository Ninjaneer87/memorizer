import { useCardContext } from "context/cardContext";
import Card from "./Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useGameContext } from "context/gameContext";
import { formatTime } from "utils/utility";

const Board = () => {
  const { cards, flipCard } = useCardContext();
  const { isGameOver, time } = useGameContext();

  return (
    <div className='mt-8'>
      <div className="grid grid-cols-4 max-w-[800px] mx-auto gap-2 sm:gap-4 relative">
        {
          isGameOver
            ? <div
              style={{ animationDelay: '.5s' }}
              className="blur-in backdrop-blur-sm absolute inset-8 rounded-xl bg-black/70 grid place-items-center text-center"
            >
              <div className="flex flex-col items-center p-4 gap-4 text-xl sm:text-4xl">
                <FontAwesomeIcon icon={solid('trophy')} className='text-primary' />
                <div className="flex flex-wrap justify-center gap-2">
                  You won in <span className="text-primary">{formatTime(time)}</span>
                </div>
              </div>
            </div>
            : null
        }

        {cards.map(({ image, pairId, isOpen, isPaired, id, notMatching }, i) => (
          <Card
            key={id}
            image={image}
            notMatching={notMatching}
            id={id}
            pairId={pairId}
            isOpen={isOpen}
            isPaired={isPaired}
            handleFlip={flipCard}
            animationDelay={isGameOver ? 0 : i * 100}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;