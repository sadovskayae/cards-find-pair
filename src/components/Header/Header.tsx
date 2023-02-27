import React, { useEffect, useRef, useState } from 'react';
import { config } from '../../utils/consts';
import { IHeader, IBestValue } from './types';
import './Header.scss';

const Header = ({ win, moves, startTimer }: IHeader) => {
  const [timer, setTimer] = useState(0);
  const [bestValue, setBestValue] = useState<IBestValue>({time: 0, move: 0});
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (startTimer) {
      intervalRef.current = setInterval(() => setTimer((i) => i + 1), 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [startTimer]);

  useEffect(() => {
    if (win) {
      const record = localStorage.getItem(config.record.localStorageName);
      if (record) {
        const {time, move} = JSON.parse(record);
        if (time <= timer && move <= moves) {
          setBestValue({time, move});
        } else {
          let payload: IBestValue = bestValue;
          if (time > timer && move > moves) {
            payload = {time: timer, move: moves};
          } else if (time > timer) {
            payload = {time: timer, move};
          } else if (move > moves) {
            payload = {time, move: moves};
          } 
          setRecords(payload);
        }
      } else {
        setRecords({time: timer, move: moves});
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win]);

  const setRecords = (payload: IBestValue) => {
    localStorage.setItem(config.record.localStorageName, JSON.stringify(payload));
    setBestValue(payload);
  }

    return (
    <div className='header'>
      <div className='header__title'>{config.headerMessage.name}</div>
      <div className='header__win-message'>{win && config.headerMessage.win}</div>
      <div className='header__moves'>
        <span>{`${config.headerMessage.moves} ${moves}`}</span>
        <span className='header__best'>{win && ` ${config.headerMessage.bestResult} ${bestValue?.move}`}</span>
      </div>
      <div className='header__timer'>
        <span>{`${config.headerMessage.timer} ${timer}`}</span>
        <span className='header__best'>{win && ` ${config.headerMessage.bestResult} ${bestValue?.time}`}</span>
      </div>
    </div>
  );
};

export default Header;
