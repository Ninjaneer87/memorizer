import { useStorage } from "hooks/useStorage";
import { useCallback, useContext, useEffect, useMemo, PropsWithChildren } from "react";
import { createContext } from "react";
import { NUMBER_OF_PAIRS, STORAGE_KEYS } from "utils/constants";
import { useCardContext } from "context/cardContext";
import { usePlayerContext } from "context/playerContext";
import { useScoreContext } from "context/scoreContext";
import { useTimeContext } from "./timeContext";

type GameContextType = {
  isGameOver: boolean;
  startTime: () => void;
  pauseTime: () => void;
  newGame: () => void;
  stopTime: () => void;
  getTime: () => number
};

const GameContext = createContext({});

export const GameContextProvider = ({ children }: PropsWithChildren) => {
  const [isGameOver, setIsGameOver] = useStorage(STORAGE_KEYS.IS_GAME_OVER, false);
  const { pauseTime, startTime, stopTime, getTime } = useTimeContext();
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
    if(player) saveScore(player, getTime());
  }, [pauseTime, player, saveScore, setIsGameOver, setMatchingPairsCount, getTime]);

  useEffect(() => {
    if (matchingPairsCount === NUMBER_OF_PAIRS) gameOver();
  }, [matchingPairsCount, gameOver]);

  useEffect(resumeGame, [resumeGame]);

  const context: GameContextType = useMemo(() => ({
    startTime,
    pauseTime,
    newGame,
    stopTime,
    isGameOver,
    getTime
  }
  ), [startTime, pauseTime, newGame, stopTime, isGameOver, getTime]);

  return <GameContext.Provider value={context}>
    {children}
  </GameContext.Provider>
}

export const useGameContext = () => useContext(GameContext) as GameContextType;