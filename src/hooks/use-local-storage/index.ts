import { Dispatch, SetStateAction, useState } from "react";

//https://web.dev/cache-api-quick-guide/
export const useLocalStorage = <T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  const setValue = (value: T): T => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      return value;
    } catch (err) {
      console.error(err);
      return value
    }
  };

  return [storedValue, setValue as Dispatch<SetStateAction<T>>];
};

export default useLocalStorage;

export const getLocalStorage = <T>(key: string): T|null => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};
