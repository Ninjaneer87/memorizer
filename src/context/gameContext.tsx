import { useStopwatch } from "hooks/useStopwatch";
import { useStorage } from "hooks/useStorage";
import { useCallback, useContext, useEffect, useMemo, PropsWithChildren } from "react";
import { createContext } from "react";
import { NUMBER_OF_PAIRS, STORAGE_KEYS } from "utils/constants";
import { useCardContext } from "context/cardContext";
import { usePlayerContext } from "context/playerContext";
import { useScoreContext } from "context/scoreContext";

type GameContextType = {
  isTimeRunning: boolean;
  isGameOver: boolean;
  time: number;
  startTime: () => void;
  pauseTime: () => void;
  newGame: () => void;
  stopTime: () => void;
};

const GameContext = createContext({});

export const GameContextProvider = ({ children }: PropsWithChildren) => {
  const [isGameOver, setIsGameOver] = useStorage(STORAGE_KEYS.IS_GAME_OVER, false);
  const { isTimeRunning, pauseTime, restartTime, startTime, time, stopTime, getTimeSnapshot } = useStopwatch();
  const { getNewCards, matchingPairsCount } = useCardContext();
  const { saveScore } = useScoreContext();
  const { player } = usePlayerContext();

  const newGame = useCallback(() => {
    setIsGameOver(false);
    getNewCards();
    restartTime();
  }, [getNewCards, restartTime, setIsGameOver])

  const gameOver = useCallback(() => {
    setIsGameOver(true);
    pauseTime();
    if(player) saveScore(player, getTimeSnapshot());
  }, [pauseTime, player, getTimeSnapshot, saveScore, setIsGameOver]);

  useEffect(() => {
    if (matchingPairsCount === NUMBER_OF_PAIRS) {
      gameOver()
    }
  }, [matchingPairsCount, gameOver]);

  const context: GameContextType = useMemo(() => ({
    isTimeRunning,
    time,
    startTime,
    pauseTime,
    newGame,
    stopTime,
    isGameOver,
  }), [isTimeRunning, time, startTime, pauseTime, newGame, stopTime, isGameOver]);

  return <GameContext.Provider value={context}>
    {children}
  </GameContext.Provider>
}

export const useGameContext = () => useContext(GameContext) as GameContextType;