import { useStorage } from "hooks/useStorage";
import React, { useContext, useMemo } from "react";
import { createContext } from "react";
import { STORAGE_KEYS } from "utils/constants";

type PlayerContextType = {
  player: string;
  setPlayer: (value: string | ((val: string) => string)) => void;
  playerLoaded: boolean;
};
type Props = {
  children: React.ReactNode;
};

const PlayerContext = createContext({});

export const PlayerContextProvider = ({ children }: Props) => {
  const [player, setPlayer, loaded] = useStorage(STORAGE_KEYS.PLAYER, '');

  const context: PlayerContextType = useMemo(() => ({
    player,
    setPlayer,
    playerLoaded: loaded
  }), [loaded, player, setPlayer])

  return <PlayerContext.Provider value={context}>
    {children}
  </PlayerContext.Provider>
}

export const usePlayerContext = () => useContext(PlayerContext) as PlayerContextType;