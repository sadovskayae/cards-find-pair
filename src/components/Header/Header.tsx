import React, { useEffect, useRef, useState } from "react";

const Header = ({
  win,
  moves,
  startTimer
}: {
  win: boolean;
  moves: number;
  startTimer: boolean;
}) => {
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (startTimer) {
      intervalRef.current = setInterval(() => setTimer(i => i+1), 1000);
    }
    return () => {clearInterval(intervalRef.current);}
  }, [startTimer]);

  return (
    <div className='header'>
      <div className='header__win-message'>{win && 'Congratulations! You beat the game!'}</div>
      <div className='header__moves'>{`Moves: ${moves}`}</div>
      <div className='header__timer'>{`Time: ${timer}`}</div>
    </div>
  );
};

export default Header;
