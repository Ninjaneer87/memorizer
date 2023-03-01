import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useGameContext } from 'context/gameContext';
import { usePlayerContext } from 'context/playerContext';
import React, { useRef, useState } from 'react';

const Authenticate = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setPlayer } = usePlayerContext();
  const { newGame } = useGameContext();
  const [error, setError] = useState(false);

  const handlePlayer: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    const player = inputRef.current?.value;
    if (player?.trim()) {
      setPlayer(player);
      newGame();
      return
    }
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 4000);
  }

  return (
    <div className='flex flex-col justify-center items-center gap-12'>
      <div className='pt-10 blur-in relative'>
        <h1>Enter your name</h1>
        <form onSubmit={handlePlayer}>
          <input
            spellCheck={false}
            type="text"
            ref={inputRef}
            placeholder='MegaByte, SuperMem...'
            className='block rounded-lg w-full p-4 border border-solid border-primary bg-transparent placeholder:text-placeholder focus-within:border-secondary hover:border-secondary transition-all'
          />
          <button className='rounded-lg bg-secondary w-full mt-4 p-4 uppercase'>
            Start the game <FontAwesomeIcon icon={faCoffee} />
          </button>
        </form>
        <div className={`absolute left-0 bottom-[-2rem] text-center w-full text-red-400 ${error ? 'blur-in' : 'blur-out'}`}>
          <FontAwesomeIcon icon={solid('triangle-exclamation')} /> Please enter your name
        </div>
      </div>

      <FontAwesomeIcon
        icon={solid('shapes')}
        style={{ animationDelay: '200ms' }}
        className='blur-in text-6xl text-primary p-8 border-[2px] border-solid border-transparent border-t-0 border-b-0 border-l-primary border-r-secondary rounded-full'
      />
    </div>
  );
};

export default Authenticate;