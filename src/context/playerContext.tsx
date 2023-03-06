import { useStorage } from "hooks/useStorage";
import { useContext, useMemo, PropsWithChildren } from "react";
import { createContext } from "react";
import { STORAGE_KEYS } from "utils/constants";

type PlayerContextType = {
  player: string;
  setPlayer: (value: string | ((val: string) => string)) => void;
  playerLoaded: boolean;
};

const PlayerContext = createContext({});

export const PlayerContextProvider = ({ children }: PropsWithChildren) => {
  const [player, setPlayer, , loaded] = useStorage(STORAGE_KEYS.PLAYER, '');

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