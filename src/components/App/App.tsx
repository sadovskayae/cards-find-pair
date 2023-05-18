import React, { useCallback, useState } from 'react';
import { config } from '../../utils/consts';
import Card from '../Card/Card';
import Header from '../Header/Header';
import './App.scss';
import { CardData } from '../../utils/types';
import AppProps from './types';

const App = ({ cards }: AppProps) => {
  const [openPair, setOpenPair] = useState<CardData[]>([]);
  const [disableCardClick, setDisableCardClick] = useState(false);
  const [completedCards, setCompletedCards] = useState<CardData[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [lastCardClicked, setLastCardClicked] = useState<CardData | undefined>();

  const handleOnClick = useCallback((card: CardData) => {
    setLastCardClicked(card);
  }, []);

  const isHidden = useCallback((card: CardData) => !!completedCards.find(x => x.id === card.id), [completedCards]);
  const isOpened = (card: CardData) => !!openPair.find(x => x.id === card.id);

  const checkWin = () => {
    if (completedCards.length === cards.length - 2) {
      setStartTimer(false);
    }
  };

  const clearCards = (isSameCard: boolean) => {
    setTimeout(
      () => {
        setOpenPair([]);
        setDisableCardClick(false);
      },
      isSameCard ? config.delay.clearEqualPair : config.delay.clearPair
    );
  };

  const checkPair = (card: CardData) => {
    if (openPair.length === 0) {
      setOpenPair([card]);
    } else {
      const isSameCard = openPair[0]?.name === card?.name;
      setDisableCardClick(true);
      setOpenPair([...openPair, card]);
      if (isSameCard) {
        setTimeout(() => {
          setCompletedCards([...completedCards, card, openPair[0]]);
        }, config.delay.completedCards);
        checkWin();
      }
      clearCards(isSameCard);
    }
    setLastCardClicked(undefined);
  };

  if (lastCardClicked) {
    if (disableCardClick || openPair.includes(lastCardClicked)) {
      setLastCardClicked(undefined);
    } else {
      if (!startTimer) {
        setStartTimer(true);
      }
      setMoves((i) => i + 1);
      checkPair(lastCardClicked);
    }
  }

  return (
    <div className='app'>
      <Header
        win={completedCards.length === cards.length}
        moves={moves}
        startTimer={startTimer}
      />
      <div className='field'>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            index={index}
            hidden={isHidden(card)}
            opened={isOpened(card)}
            onClick={handleOnClick}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
