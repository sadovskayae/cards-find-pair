import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Header from './Header';
import { config } from '../../utils/consts';

const defaultNumber = 0;
beforeEach(() => {
  window.localStorage.clear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('renders default values', () => {
  render(<Header win={false} moves={defaultNumber} startTimer={false} />);
  const moves = screen.getByText(new RegExp(config.headerMessage.moves, 'i'));
  const timer = screen.getByText(new RegExp(config.headerMessage.timer, 'i'));
  const win = screen.queryByText(new RegExp(config.headerMessage.win, 'i'));
  expect(moves).toBeInTheDocument();
  expect(moves).toHaveTextContent(defaultNumber.toString());
  expect(timer).toBeInTheDocument();
  expect(timer).toHaveTextContent(defaultNumber.toString());
  expect(win).toBeNull();
});

test('renders final values', () => {
  const movesProps = 4;
  render(<Header win={true} moves={movesProps} startTimer={false} />);
  const moves = screen.getByText(new RegExp(config.headerMessage.moves, 'i'));
  const timer = screen.getByText(new RegExp(config.headerMessage.timer, 'i'));
  const win = screen.queryByText(new RegExp(config.headerMessage.win, 'i'));
  expect(moves).toBeInTheDocument();
  expect(moves).toHaveTextContent(movesProps.toString());
  expect(timer).toBeInTheDocument();
  expect(win).toHaveTextContent(config.headerMessage.win);
});

test('render record from localstorage', () => {
  const recordValue = 2;
  const currentValue = 4;
  const spy = jest.spyOn(Storage.prototype, 'setItem');
  localStorage.setItem(config.record.localStorageName, JSON.stringify({move: recordValue, time: recordValue}));
  const {rerender} = render(<Header win={false} moves={defaultNumber} startTimer={true}/>);
  
  act(() => {jest.advanceTimersByTime(currentValue*1000);});
  rerender(<Header win={true} moves={currentValue} startTimer={false}/>);
  const bestScore = screen.getAllByText(new RegExp(config.headerMessage.bestResult, "i"));
  expect(localStorage.setItem).toHaveBeenCalled();
  expect(bestScore[0]).toHaveTextContent(recordValue.toString());
  expect(bestScore[1]).toHaveTextContent(recordValue.toString());
  spy.mockRestore();
});

test('render new record', () => {
  const recordValue = 6;
  const currentValue = 4;
  const spy = jest.spyOn(Storage.prototype, 'setItem');
  localStorage.setItem(config.record.localStorageName, JSON.stringify({move: recordValue, time: recordValue}));
  const {rerender} = render(<Header win={false} moves={defaultNumber} startTimer={true}/>);
  
  act(() => {jest.advanceTimersByTime(currentValue*1000);});
  rerender(<Header win={true} moves={currentValue} startTimer={false}/>);
  const bestScore = screen.getAllByText(new RegExp(config.headerMessage.bestResult, "i"));
  expect(bestScore[0]).toHaveTextContent(currentValue.toString());
  expect(bestScore[1]).toHaveTextContent(currentValue.toString());
  spy.mockRestore();
});

test('render just new time record', () => {
  const recordValue = 6;
  const currentValue = 4;
  const spy = jest.spyOn(Storage.prototype, 'setItem');
  localStorage.setItem(config.record.localStorageName, JSON.stringify({move: recordValue, time: recordValue}));
  const {rerender} = render(<Header win={false} moves={defaultNumber} startTimer={true}/>);
  
  act(() => {jest.advanceTimersByTime(currentValue*1000);});
  rerender(<Header win={true} moves={recordValue} startTimer={false}/>);
  const bestScore = screen.getAllByText(new RegExp(config.headerMessage.bestResult, "i"));
  expect(bestScore[0]).toHaveTextContent(recordValue.toString());
  expect(bestScore[1]).toHaveTextContent(currentValue.toString());
  spy.mockRestore();
});

test('render just new moves record', () => {
  window.localStorage.clear();
  const recordValue = 6;
  const currentValue = 4;
  const spy = jest.spyOn(Storage.prototype, 'setItem');
  localStorage.setItem(config.record.localStorageName, JSON.stringify({move: recordValue, time: recordValue}));
  const {rerender} = render(<Header win={false} moves={defaultNumber} startTimer={true}/>);
  
  act(() => {jest.advanceTimersByTime(recordValue*1500);});
  rerender(<Header win={true} moves={currentValue} startTimer={false}/>);
  const bestScore = screen.getAllByText(new RegExp(config.headerMessage.bestResult, "i"));
  expect(bestScore[0]).toHaveTextContent(currentValue.toString());
  expect(bestScore[1]).toHaveTextContent(recordValue.toString());
  spy.mockRestore();
});