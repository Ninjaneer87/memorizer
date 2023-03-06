import GameBoard from "components/GameBoard";
import GameCockpit from "components/GameCockpit";
import { Outlet } from "react-router-dom";

const Game = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <GameCockpit />
      <GameBoard />
      <Outlet />
    </div>
  );
};

export default Game;