import { useEffect, useRef, useState } from 'react';

export const useTimer = (startTimer: boolean) => {
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (startTimer) {
      intervalRef.current = setInterval(() => setTimer((i) => i + 1), 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [startTimer]);

  return timer;
};
