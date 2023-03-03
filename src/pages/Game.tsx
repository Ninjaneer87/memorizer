import GameBoard from "components/GameBoard";
import GameControls from "components/GameControls";
import { Outlet } from "react-router-dom";

const Game = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <GameControls />
      <GameBoard />
      <Outlet />
    </div>
  );
};

export default Game;