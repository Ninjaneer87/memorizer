import { useStorage } from "hooks/useStorage";
import { useContext, useCallback, useMemo, PropsWithChildren } from "react";
import { createContext } from "react";
import { STORAGE_KEYS } from "utils/constants";

export type Score = {
  player: string;
  time: number;
};
type ScoreContextType = {
  scores: Score[];
  saveScore: (player: string, time: number) => void;
}

const ScoreContext = createContext({});
const initialScores = [] as Score[];

export const ScoreContextProvider = ({ children }: PropsWithChildren) => {
  const [scores, setScores] = useStorage(STORAGE_KEYS.SCORES, initialScores);

  const saveScore = useCallback(
    (player: string, time: number) => {
      const newScore = { player, time };
      setScores((prevScores) => {
        if (prevScores.length) {
          const oldScore = prevScores.find((s) => s.player === player);
          if (!oldScore)
            return [...prevScores, newScore].sort((a, b) => a.time - b.time);

          const newScores = prevScores
            .map((score) => {
              if (score.player === player && score.time > time) return newScore;
              return score;
            })
            .sort((a, b) => a.time - b.time);

          return newScores;
        }
        return [newScore];
      });
    },
    [setScores]
  );

  const context: ScoreContextType = useMemo(() =>({
    scores,
    saveScore,
  }), [scores, saveScore])

  return <ScoreContext.Provider value={context}>
    {children}
  </ScoreContext.Provider>
}

export const useScoreContext = () => useContext(ScoreContext) as ScoreContextType;