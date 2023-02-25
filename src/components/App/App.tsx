import React, { useState } from "react";
import { iconNames } from "../../utils/consts";
import { shuffle } from "../../utils/helpers";
import Card from "../Card/Card";
import "./App.scss";

const cards = shuffle(iconNames.concat(iconNames));
function App() {
  const [openPair, setOpenPair] = useState<number[]>([]);
  const [disableCardClick, setDisableCardClick] = useState(false);
  const [completedCards, setCompletedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const win = completedCards.length === cards.length ? true : false;

  const handleOnClick = (index: number) => {
    if (disableCardClick) {
      return;
    }
    setMoves(i => i+1);
    if (openPair.length === 0) {
      setOpenPair([index]);
    } else {
      setDisableCardClick(true);
      setOpenPair([...openPair, index]);
      if (cards[index] === cards[openPair[0]]) {
        setTimeout(() => {
          setCompletedCards([...completedCards, index, openPair[0]]);
        }, 500);
      }
      setTimeout(() => {
        setOpenPair([]);
        setDisableCardClick(false);
      }, 1500);
    }
  };

  return (
    <div className="app"> 
      <div>
        <div>{win && 'Congratulations! You beat the game!'}</div>
        <div>{`Moves: ${moves}`}</div>
        <div>{`Time: `}</div>
      </div>
      <div className="field">
        {cards.map((name, index) => (
          <Card
            iconName={name}
            key={index}
            index={index}
            hidden={completedCards.includes(index)}
            opened={openPair.includes(index)}
            onClick={handleOnClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
