import { useEffect } from "react";

const beforeUnloadHandler = (e: Event) => {
  e.returnValue = true;
  e.preventDefault();
  return "Operation in progress, reload may brake the game.";
}

export function usePreventReload(condition: boolean) {
  useEffect(() => {
    if (condition) {
      window.addEventListener('beforeunload', beforeUnloadHandler);
    }
    return () => window.removeEventListener('beforeunload', beforeUnloadHandler);
  }, [condition])
}
