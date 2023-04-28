/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { IBestValue } from '../utils/types';
import { config } from '../utils/consts';

export const useCheckRecord = (win: boolean, timer: number, moves: number) => {
  const [bestValue, setBestValue] = useState<IBestValue>({ time: 0, move: 0 });

  useEffect(() => {
    if (win) {
      const record = localStorage.getItem(config.record.localStorageName);
      if (record) {
        const { time, move } = JSON.parse(record) as IBestValue;
        if (time <= timer && move <= moves) {
          setBestValue({ time, move });
        } else {
          const payload: IBestValue = {
            time: time > timer ? timer : time,
            move: move > moves ? moves : move,
          };
          setRecords(payload);
        }
      } else {
        setRecords({ time: timer, move: moves });
      }
    }
  }, [win]);

  const setRecords = (payload: IBestValue) => {
    localStorage.setItem(
      config.record.localStorageName,
      JSON.stringify(payload)
    );
    setBestValue(payload);
  };

  return bestValue;
};
