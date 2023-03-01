import { useCallback, useEffect, useState } from 'react';

export function useStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const item = localStorage.getItem(key);
    setStoredValue(item ? JSON.parse(item) : initialValue);
    setLoaded(true);
  }, [key, initialValue]);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    const storageValue = localStorage.getItem(key);
    const storedValue = storageValue ? JSON.parse(storageValue) : initialValue;
    const newValue = value instanceof Function ? value(storedValue) : value;
    
    setStoredValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }, [key, initialValue]);
  
  return [storedValue, setValue, loaded] as const;
}
