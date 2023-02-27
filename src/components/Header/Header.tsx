import React, { useEffect, useRef, useState } from 'react';
import { config } from '../../utils/consts';
import IHeader from './types';
import './Header.scss';

const Header = ({ win, moves, startTimer }: IHeader) => {
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

  return (
    <div className='header'>
      <div className='header__title'>{config.headerMessage.name}</div>
      <div className='header__win-message'>{win && config.headerMessage.win}</div>
      <div className='header__moves'>{`${config.headerMessage.moves} ${moves}`}</div>
      <div className='header__timer'>{`${config.headerMessage.timer} ${timer}`}</div>
    </div>
  );
};

export default Header;
