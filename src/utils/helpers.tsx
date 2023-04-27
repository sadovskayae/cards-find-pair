import { v4 as uuidv4 } from 'uuid';
import { CardData } from './types';

export const shuffle = (arr: CardData[]): CardData[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

export const getCards = (cards: string[]) => {
  const newCards = shuffle([...cards,...cards].map((card) => {
    return {
      name: card,
      id: uuidv4()
    }
  }));
  return newCards;
}

export const cardContainsClass = (node: HTMLElement, className: string) => {
  return node?.parentElement?.parentElement?.className?.includes(className);
};
