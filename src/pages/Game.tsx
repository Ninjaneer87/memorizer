import Board from "components/Board";
import GameControls from "components/GameControls";
import { Outlet } from "react-router-dom";

const Game = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <GameControls />
      <Board />
      <Outlet />
    </div>
  );
};

export default Game;