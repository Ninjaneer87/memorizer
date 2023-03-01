import { useState, useRef, useEffect, useCallback } from "react";
import { useStorage } from "./useStorage";

const intervalValue = 1000;

export function useStopwatch() {
  const [time, setTime] = useStorage("time", 0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();


  const getTimeSnapshot = useCallback(() => {
    const storageTime = localStorage.getItem("time");
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
