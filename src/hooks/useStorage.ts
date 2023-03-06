import { useCallback, useEffect, useState } from 'react';

export function useStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [loaded, setLoaded] = useState(false);
  
  const getValue = useCallback(() => {
    const storageValue = localStorage.getItem(key);
    const value: T = storageValue ? JSON.parse(storageValue) : initialValue;
    return value;
  }, [key, initialValue]);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    const prevValue = getValue();
    const newValue = value instanceof Function ? value(prevValue) : value;
    
    setStoredValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }, [key, getValue]);

  useEffect(() => {
    const value = getValue();
    setStoredValue(value);
    setLoaded(true);
  }, [getValue]);
  
  return [storedValue, setValue, getValue, loaded] as const;
}
