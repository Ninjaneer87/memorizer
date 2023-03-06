import React from 'react';
import GameControls from './GameControls';
import GameInfo from './GameInfo';

const GameCockpit = () => {
  return (
    <div className='blur-in flex flex-wrap gap-4 items-start justify-between max-sm:items-center max-sm:flex-col'>
      <GameInfo />
      <GameControls />
    </div>
  );
};

export default React.memo(GameCockpit);