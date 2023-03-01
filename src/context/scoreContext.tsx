import { Score, useScores } from "hooks/useScores";
import React, { useContext } from "react";
import { createContext } from "react";

const ScoreContext = createContext({});

type ScoreContextType = {
  scores: Score[];
  saveScore: (player: string, time: number) => void;
}

type Props = {
  children: React.ReactNode;
};

export const ScoreContextProvider = ({ children }: Props) => {
  const { scores, saveScore } = useScores();

  const context: ScoreContextType = {
    scores,
    saveScore,
  }

  return <ScoreContext.Provider value={context}>
    {children}
  </ScoreContext.Provider>
}

export const useScoreContext = () => useContext(ScoreContext) as ScoreContextType;