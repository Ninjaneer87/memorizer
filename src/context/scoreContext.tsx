import { Score, useScores } from "hooks/useScores";
import React, { useContext } from "react";
import { createContext } from "react";

const ScoreContext = createContext({});

type ScoreContextType = {
  scores: Score[];
  addScore: (player: string, time: number) => void;
}

type Props = {
  children: React.ReactNode;
};

export const ScoreContextProvider = ({ children }: Props) => {
  const { scores, addScore } = useScores();

  const context: ScoreContextType = {
    scores,
    addScore,
  }

  return <ScoreContext.Provider value={context}>
    {children}
  </ScoreContext.Provider>
}

export const useScoreContext = () => useContext(ScoreContext) as ScoreContextType;