import { useCallback } from "react";
import { StorageKeys } from "utils/constants";
import { useStorage } from "./useStorage";

export type Score = {
  player: string;
  time: number;
};

const initialScores = [] as Score[];

export function useScores() {
  const [scores, setScores] = useStorage(StorageKeys.SCORES, initialScores);

  const addScore = useCallback(
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

  return {
    scores,
    addScore,
  };
}
