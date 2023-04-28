import React from 'react';
import { config } from '../../utils/consts';
import { HeaderProps } from './types';
import './Header.scss';
import { useCheckRecord } from '../../hooks/useCheckRecord';
import { useTimer } from '../../hooks/useTimer';

const Header = ({ win, moves, startTimer }: HeaderProps) => {
  const timer = useTimer(startTimer);
  const bestValue = useCheckRecord(win, timer, moves);

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
