import { useState, useRef, useEffect, useCallback } from "react";
import { STORAGE_KEYS } from "utils/constants";
import { useStorage } from "./useStorage";

const intervalValue = 1000;

export function useStopwatch() {
  const [time, setTime] = useStorage(STORAGE_KEYS.TIME, 0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();


  const getTimeSnapshot = useCallback(() => {
    const storageTime = localStorage.getItem(STORAGE_KEYS.TIME);
    const time = storageTime ? +storageTime : 0;
    return time;
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setTime(0);
    setIsRunning(true);
  }, [setTime]);

  const stop = useCallback(() => {
    setTime(0);
    setIsRunning(false);
  }, [setTime]);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + intervalValue);
      }, intervalValue);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, setTime]);

  return {
    isRunning,
    time,
    start,
    pause,
    reset,
    stop,
    getTimeSnapshot
  };
}
