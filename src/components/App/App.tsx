import React, { useState } from "react";
import { config } from "../../utils/consts";
import Card from "../Card/Card";
import Header from "../Header/Header";
import "./App.scss";
import IApp from "./types";

const App = ({cards}: IApp) => {
  const [openPair, setOpenPair] = useState<number[]>([]);
  const [disableCardClick, setDisableCardClick] = useState(false);
  const [completedCards, setCompletedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTimer, setStartTimer] = useState(false);

  const checkWin = () => {
    if (completedCards.length === cards.length - 2) {
      setStartTimer(false);
    }
  }

  const clearCards = (isSameCard: boolean) => {
    setTimeout(() => {
      setOpenPair([]);
      setDisableCardClick(false);
    }, isSameCard ? config.delay.clearEqualPair : config.delay.clearPair);
  }

  const checkPair = (index: number) => {
    if (openPair.length === 0) {
      setOpenPair([index]);
    } else {
      const isSameCard = cards[index] === cards[openPair[0]];
      setDisableCardClick(true);
      setOpenPair([...openPair, index]);
        if (isSameCard) {
          setTimeout(() => {
            setCompletedCards([...completedCards, index, openPair[0]]);
          }, config.delay.completedCards);
          checkWin();
        }
        clearCards(isSameCard);
      }
  }

  const handleOnClick = (index: number) => {
    if (disableCardClick || openPair.includes(index)) {
      return;
    }
    if (!startTimer) {
      setStartTimer(true);
    }
    setMoves(i => i+1);
    checkPair(index);
  };

  return (
    <div className="app"> 
      <Header win={completedCards.length === cards.length} moves={moves} startTimer={startTimer}/>
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
