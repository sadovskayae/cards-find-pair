/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { config, testCards } from '../../utils/consts';
import { KeyValue } from '../../utils/types';
import { cardContainsClass } from '../../utils/helpers';

const testCardNameRegex = new RegExp(testCards[1]?.name, 'i');
const testCardRole = new RegExp(config.card.ariaRole, 'i');

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('all cards have pairs', () => {
  render(<App cards={testCards} />);
  const cards: KeyValue = {};
  testCards.forEach((item) => {
    cards[item?.name] = !cards[item?.name] ? 1 : cards[item?.name] + 1;
  });
  let isPaired = Object.values(cards).every((item) => item === 2);
  expect(isPaired).toBeTruthy();
});

test('there are at least 4 cards', () => {
  expect(testCards.length).toBeGreaterThanOrEqual(4);
});

test('increase moves by 1 on same card', () => {
  render(<App cards={testCards} />);
  const firstCard = screen.getAllByText(testCardNameRegex)[0];
  expect(firstCard).toBeInTheDocument();
  fireEvent.click(firstCard);
  const movesText = screen.getByText(
    new RegExp(config.headerMessage.moves, 'i')
  );
  expect(movesText).toHaveTextContent('1');
  fireEvent.click(firstCard);
  expect(movesText).toHaveTextContent('1');
});

test('start timer by click', () => {
  render(<App cards={testCards} />);
  const card = screen.getAllByText(testCardNameRegex)[0];
  fireEvent.click(card);
  const timerText = screen.getByText(
    new RegExp(config.headerMessage.timer, 'i')
  );

  act(() => {jest.advanceTimersByTime(1000);});
  expect(timerText).toHaveTextContent('1')
});

test('set open-card class once per card', () => {
  render(<App cards={testCards} />);
  const card = screen.getAllByText(testCardNameRegex)[0];
  const isCardOpened0 = cardContainsClass(
    card,
    config.card.classModifiers.open
  );
  expect(isCardOpened0).toBeFalsy();
  fireEvent.click(card);
  const isCardOpened1 = cardContainsClass(
    card,
    config.card.classModifiers.open
  );
  expect(isCardOpened1).toBeTruthy();
  fireEvent.click(card);
  const isCardOpened2 = cardContainsClass(
    card,
    config.card.classModifiers.open
  );
  expect(isCardOpened2).toBeTruthy();
});

test('check equal pair', () => {
  render(<App cards={testCards} />);
  const cards = screen.getAllByText(testCardNameRegex);
  const card1 = cards[0];
  const card2 = cards[1];
  fireEvent.click(card1);
  const isCard1Opened = cardContainsClass(
    card1,
    config.card.classModifiers.open
  );
  fireEvent.click(card2);
  const isCard2Opened = cardContainsClass(
    card2,
    config.card.classModifiers.open
  );
  expect(isCard1Opened).toBeTruthy();
  expect(isCard2Opened).toBeTruthy();

  act(() => {jest.advanceTimersByTime(config.delay.clearEqualPair);});
  const c1 = card1?.parentElement?.parentElement?.className;
  const c2 = card2?.parentElement?.parentElement?.className;
  expect(c1).toContain(config.card.classModifiers.hidden);
  expect(c1).not.toContain(config.card.classModifiers.open);
  expect(c2).toContain(config.card.classModifiers.hidden);
  expect(c2).not.toContain(config.card.classModifiers.open);
});

test('check non-equal pair', () => {
  render(<App cards={testCards} />);
  const cards = screen.getAllByRole(testCardRole);
  const card1 = cards[0];
  const card2 = cards[1];
  expect(card1.textContent).not.toEqual(card2.textContent);
  fireEvent.click(card1);
  const isCard1Opened = card1.className.includes(
    config.card.classModifiers.open
  );
  fireEvent.click(card2);
  const isCard2Opened = card2.className.includes(
    config.card.classModifiers.open
  );
  expect(isCard1Opened).toBeTruthy();
  expect(isCard2Opened).toBeTruthy();

  act(() => {jest.advanceTimersByTime(config.delay.clearPair);});
  const c1 = card1.className; 
  const c2 = card2.className;
  expect(c1).not.toContain(config.card.classModifiers.hidden);
  expect(c1).not.toContain(config.card.classModifiers.open);
  expect(c2).not.toContain(config.card.classModifiers.hidden);
  expect(c2).not.toContain(config.card.classModifiers.open);
});

test('click on 3rd card does not open it while pair active', () => {
  render(<App cards={testCards} />);
  const cards = screen.getAllByRole(testCardRole);
  cards.forEach((element) => {
    fireEvent.click(element);
  });
  const isOtherCardOpened = cards[2].className.includes(
    config.card.classModifiers.open
  );
  expect(isOtherCardOpened).toBeFalsy();
});

test('check win message', async () => {
  render(<App cards={[testCards[1], testCards[3]]} />);
  const cards = screen.getAllByText(testCardNameRegex);
  const card1 = cards[0];
  const card2 = cards[1];
  fireEvent.click(card1);
  fireEvent.click(card2);

  act(() => {jest.advanceTimersByTime(1000);});
  const win = screen.queryByText(new RegExp(config.headerMessage.win, 'i'));
  expect(win).toHaveTextContent(config.headerMessage.win);
});

test('set open-card class by enter', () => {
  render(<App cards={testCards} />);
  const cards = screen.getAllByText(testCardNameRegex);
  const card = cards[0];
  const isCardOpened0 = cardContainsClass(
    card,
    config.card.classModifiers.open
  );
  expect(isCardOpened0).toBeFalsy();
  fireEvent.keyDown(card, {key: 'Enter', code: 'Enter', charCode: 13});
  const isCardOpened1 = cardContainsClass(
    card,
    config.card.classModifiers.open
  );
  expect(isCardOpened1).toBeTruthy();
  fireEvent.keyDown(cards[1], {key: 'A', code: 'KeyA'});
  const isCardOpenedByA = cardContainsClass(
    cards[1],
    config.card.classModifiers.open
  );
  expect(isCardOpenedByA).toBeFalsy();
});