import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGameContext } from 'context/gameContext';
import { usePlayerContext } from 'context/playerContext';
import React, { useRef } from 'react';

const Authenticate = () => {
  const playerRef = useRef<HTMLInputElement>(null);
  const { setPlayer } = usePlayerContext();
  const { newGame } = useGameContext();

  const handlePlayer: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    const player = playerRef.current?.value;
    if (player?.trim()) {
      setPlayer(player);
      newGame();
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='pt-10 blur-in'>
        <h1>Enter your name</h1>
        <form onSubmit={handlePlayer}>
          <input
            spellCheck={false}
            type="text"
            ref={playerRef}
            placeholder='MegaByte, SuperMem...'
            className='block rounded-lg  w-full p-4 border border-solid border-primary bg-transparent placeholder:text-placeholder focus-within:border-secondary hover:border-secondary transition-all'
          />
          <button className='rounded-lg bg-secondary w-full mt-4 p-4 uppercase'>Start the game <FontAwesomeIcon icon={faCoffee} /> </button>
        </form>
      </div>
    </div>
  );
};

export default Authenticate;