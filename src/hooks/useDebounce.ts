import { useRef } from 'react';

export const useDebouncedCallback = (callback: (...args: string[]) => void, delay = 300) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (...args: string[]) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};