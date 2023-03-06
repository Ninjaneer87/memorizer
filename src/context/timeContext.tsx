import { useRef, useEffect, useCallback, PropsWithChildren, useMemo, useContext, createContext } from "react";
import { STORAGE_KEYS } from "utils/constants";
import { useStorage } from "hooks/useStorage";

const intervalValue = 1000;

type TimeContextType = {
  time: number;
  startTime: () => void;
  pauseTime: () => void;
  stopTime: () => void;
  getTime: () => number;
}
const TimeContext = createContext({});

export const TimeContextProvider = ({ children }: PropsWithChildren) => {
  const [time, setTime, getTime] = useStorage(STORAGE_KEYS.TIME, 0);
  const [isPaused, setIsPaused] = useStorage(STORAGE_KEYS.IS_PAUSED, true);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const startTime = useCallback(() => {
    setIsPaused(false);
  }, [setIsPaused]);

  const pauseTime = useCallback(() => {
    setIsPaused(true);
  }, [setIsPaused]);

  const stopTime = useCallback(() => {
    setTime(0);
    setIsPaused(true);
  }, [setTime, setIsPaused]);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + intervalValue);
      }, intervalValue);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused, setTime]);

  const context: TimeContextType = useMemo(() => ({
    time,
    startTime,
    pauseTime,
    stopTime,
    getTime,
  }), [time, startTime, pauseTime, stopTime, getTime]) ;

  return <TimeContext.Provider value={context}>
    {children}
  </TimeContext.Provider>
}

export const useTimeContext = () => useContext(TimeContext) as TimeContextType;