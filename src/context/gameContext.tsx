import { useStopwatch } from "hooks/useStopwatch";
import { useStorage } from "hooks/useStorage";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { createContext } from "react";
import { NUMBER_OF_PAIRS, STORAGE_KEYS } from "utils/constants";
import { useCardContext } from "./cardContext";
import { usePlayerContext } from "./playerContext";
import { useScoreContext } from "./scoreContext";

type GameContextType = {
  isRunning: boolean;
  isGameOver: boolean;
  time: number;
  start: () => void;
  pause: () => void;
  newGame: () => void;
  stop: () => void;
};

type Props = {
  children: React.ReactNode;
};

const GameContext = createContext({});

export const GameContextProvider = ({ children }: Props) => {
  const [isGameOver, setIsGameOver] = useStorage(STORAGE_KEYS.IS_GAME_OVER, false);
  const { isRunning, pause, reset, start, time, stop, getTimeSnapshot } = useStopwatch();
  const { getNewCards, matchingPairsCount } = useCardContext();
  const { saveScore } = useScoreContext();
  const { player } = usePlayerContext();

  const newGame = useCallback(() => {
    setIsGameOver(false);
    getNewCards();
    reset();
  }, [getNewCards, reset, setIsGameOver])

  const gameOver = useCallback(() => {
    setIsGameOver(true);
    pause();
    if(player) saveScore(player, getTimeSnapshot());
  }, [pause, player, getTimeSnapshot, saveScore, setIsGameOver]);

  useEffect(() => {
    if (matchingPairsCount === NUMBER_OF_PAIRS) {
      gameOver()
    }
  }, [matchingPairsCount, gameOver]);

  const context: GameContextType = useMemo(() => ({
    isRunning,
    time,
    start,
    pause,
    newGame,
    stop,
    isGameOver,
  }), [isRunning, time, start, pause, newGame, stop, isGameOver]);

  return <GameContext.Provider value={context}>
    {children}
  </GameContext.Provider>
}

export const useGameContext = () => useContext(GameContext) as GameContextType;