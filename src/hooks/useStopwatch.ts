import { useRef, useEffect, useCallback } from "react";
import { STORAGE_KEYS } from "utils/constants";
import { useStorage } from "hooks/useStorage";

const intervalValue = 1000;

export function useStopwatch() {
  const [time, setTime] = useStorage(STORAGE_KEYS.TIME, 0);
  const [isPaused, setIsPaused] = useStorage(STORAGE_KEYS.IS_PAUSED, true);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const getTimeSnapshot = useCallback(() => {
    const storageTime = localStorage.getItem(STORAGE_KEYS.TIME);
    const time = storageTime ? +storageTime : 0;
    return time;
  }, []);

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

  return {
    isPaused,
    time,
    startTime,
    pauseTime,
    stopTime,
    getTimeSnapshot,
  };
}
