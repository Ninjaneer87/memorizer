import { useStopwatch } from "hooks/useStopwatch";
import { useStorage } from "hooks/useStorage";
import { useCallback, useContext, useEffect, useMemo, PropsWithChildren } from "react";
import { createContext } from "react";
import { NUMBER_OF_PAIRS, STORAGE_KEYS } from "utils/constants";
import { useCardContext } from "context/cardContext";
import { usePlayerContext } from "context/playerContext";
import { useScoreContext } from "context/scoreContext";

type GameContextType = {
  isPaused: boolean;
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
  const { isPaused, pauseTime, startTime, time, stopTime, getTimeSnapshot } = useStopwatch();
  const { getNewCards, matchingPairsCount, creatingNewCards, setMatchingPairsCount } = useCardContext();
  const { saveScore } = useScoreContext();
  const { player } = usePlayerContext();

  const newGame = useCallback(() => {
    stopTime();
    setIsGameOver(false);
    getNewCards();
  }, [getNewCards, setIsGameOver, stopTime]);

  const resumeGame = useCallback(() => {
    if(!creatingNewCards && !isGameOver && !!player) {
      startTime()
    };
  }, [creatingNewCards, startTime, isGameOver, player]);

  const gameOver = useCallback(() => {
    setIsGameOver(true);
    setMatchingPairsCount(0);
    pauseTime();
    if(player) saveScore(player, getTimeSnapshot());
  }, [pauseTime, player, getTimeSnapshot, saveScore, setIsGameOver, setMatchingPairsCount]);

  useEffect(() => {
    if (matchingPairsCount === NUMBER_OF_PAIRS) gameOver();
  }, [matchingPairsCount, gameOver]);

  useEffect(resumeGame, [resumeGame]);

  const context: GameContextType = useMemo(() => ({
    isPaused,
    time,
    startTime,
    pauseTime,
    newGame,
    stopTime,
    isGameOver,
  }), [isPaused, time, startTime, pauseTime, newGame, stopTime, isGameOver]);

  return <GameContext.Provider value={context}>
    {children}
  </GameContext.Provider>
}

export const useGameContext = () => useContext(GameContext) as GameContextType;