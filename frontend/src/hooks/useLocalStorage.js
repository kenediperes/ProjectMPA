import { useState, useEffect } from 'react';

/**
 * Hook to manage a value in localStorage.
 * @param {string} key - The localStorage key.
 * @param {any} initialValue - Default value if no stored value exists.
 * @returns {[any, function]} - Stateful value and a setter function.
 */
export const useLocalStorage = (key, initialValue) => {
  // Get stored value or fallback to initialValue
  const readValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  // Update state and localStorage when key or initialValue changes
  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};