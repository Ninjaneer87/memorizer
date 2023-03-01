import { useStopwatch } from "hooks/useStopwatch";
import { useStorage } from "hooks/useStorage";
import React, { useCallback, useContext, useEffect } from "react";
import { createContext } from "react";
import { NUMBER_OF_PAIRS, StorageKeys } from "utils/constants";
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
  setGameOver: () => void;
};

type Props = {
  children: React.ReactNode;
};

export const GameContextProvider = ({ children }: Props) => {
  const [isGameOver, setIsGameOver] = useStorage(StorageKeys.IS_GAME_OVER, false);
  const { newCards, pairedCount } = useCardContext();
  const { isRunning, pause, reset, start, time, stop, getTimeSnapshot } = useStopwatch();
  const { addScore } = useScoreContext();
  const {player} = usePlayerContext();

  const newGame = useCallback(() => {
    setIsGameOver(false);
    newCards();
    reset();
  }, [newCards, reset, setIsGameOver])

  const setGameOver = useCallback(() => {
    pause();
    if(player) addScore(player, getTimeSnapshot());
  }, [pause, player, getTimeSnapshot, addScore]);

  useEffect(() => {
    if (pairedCount === NUMBER_OF_PAIRS * 2) {
      setIsGameOver(true);
    }
  }, [pairedCount, setIsGameOver]);

  useEffect(() => {
    if (isGameOver) {
      setGameOver()
    }
  }, [isGameOver, setGameOver])

  const context: GameContextType = {
    isRunning,
    time,
    start,
    pause,
    newGame,
    stop,
    isGameOver,
    setGameOver
  }

  return <GameContext.Provider value={context}>
    {children}
  </GameContext.Provider>
}

export const useGameContext = () => useContext(GameContext) as GameContextType;