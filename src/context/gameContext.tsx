import { useStopwatch } from "hooks/useStopwatch";
import { useStorage } from "hooks/useStorage";
import React, { useCallback, useContext, useEffect } from "react";
import { createContext } from "react";
import { NUMBER_OF_PAIRS, STORAGE_KEYS } from "utils/constants";
import { useCardContext } from "./cardContext";
import { usePlayerContext } from "./playerContext";
import { useScoreContext } from "./scoreContext";

const GameContext = createContext({});

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

export const GameContextProvider = ({ children }: Props) => {
  const [isGameOver, setIsGameOver] = useStorage(STORAGE_KEYS.IS_GAME_OVER, false);
  const { createNewCards, matchedCardsCount } = useCardContext();
  const { isRunning, pause, reset, start, time, stop, getTimeSnapshot } = useStopwatch();
  const { saveScore } = useScoreContext();
  const {player} = usePlayerContext();

  const newGame = useCallback(() => {
    setIsGameOver(false);
    createNewCards();
    reset();
  }, [createNewCards, reset, setIsGameOver])

  const gameOver = useCallback(() => {
    pause();
    if(player) saveScore(player, getTimeSnapshot());
  }, [pause, player, getTimeSnapshot, saveScore]);

  useEffect(() => {
    if (matchedCardsCount === NUMBER_OF_PAIRS * 2) {
      setIsGameOver(true);
    }
  }, [matchedCardsCount, setIsGameOver]);

  useEffect(() => {
    if (isGameOver) {
      gameOver()
    }
  }, [isGameOver, gameOver])

  const context: GameContextType = {
    isRunning,
    time,
    start,
    pause,
    newGame,
    stop,
    isGameOver,
  }

  return <GameContext.Provider value={context}>
    {children}
  </GameContext.Provider>
}

export const useGameContext = () => useContext(GameContext) as GameContextType;