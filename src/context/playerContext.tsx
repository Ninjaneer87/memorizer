import { useStorage } from "hooks/useStorage";
import React, { useContext } from "react";
import { createContext } from "react";
import { StorageKeys } from "utils/constants";

const PlayerContext = createContext({});

type PlayerContextType = {
  player: string;
  setPlayer: (value: string | ((val: string) => string)) => void;
  playerLoaded: boolean;
};

type Props = {
  children: React.ReactNode;
};

export const PlayerContextProvider = ({ children }: Props) => {
  const [player, setPlayer, loaded] = useStorage(StorageKeys.PLAYER, '');

  const context: PlayerContextType = {
    player,
    setPlayer,
    playerLoaded: loaded
  }

  return <PlayerContext.Provider value={context}>
    {children}
  </PlayerContext.Provider>
}

export const usePlayerContext = () => useContext(PlayerContext) as PlayerContextType;