import { useState, useRef, useEffect, useCallback } from "react";
import { STORAGE_KEYS } from "utils/constants";
import { useStorage } from "hooks/useStorage";

const intervalValue = 1000;

export function useStopwatch() {
  const [time, setTime] = useStorage(STORAGE_KEYS.TIME, 0);
  const [isTimeRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const getTimeSnapshot = useCallback(() => {
    const storageTime = localStorage.getItem(STORAGE_KEYS.TIME);
    const time = storageTime ? +storageTime : 0;
    return time;
  }, []);

  const startTime = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pauseTime = useCallback(() => {
    setIsRunning(false);
  }, []);

  const stopTime = useCallback(() => {
    setTime(0);
    setIsRunning(false);
  }, [setTime]);

  const restartTime = useCallback(() => {
    setTime(0);
    setIsRunning(true);
  }, [setTime]);

  useEffect(() => {
    if (isTimeRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + intervalValue);
      }, intervalValue);
    }

    return () => clearInterval(intervalRef.current);
  }, [isTimeRunning, setTime]);

  return {
    isTimeRunning,
    time,
    startTime,
    pauseTime,
    restartTime,
    stopTime,
    getTimeSnapshot,
  };
}
