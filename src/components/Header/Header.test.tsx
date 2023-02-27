import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { config } from '../../utils/consts';

const defaultNumber = '0';
test('renders default values', () => {
  render(<Header win={false} moves={0} startTimer={false} />);
  const moves = screen.getByText(new RegExp(config.headerMessage.moves, 'i'));
  const timer = screen.getByText(new RegExp(config.headerMessage.timer, 'i'));
  const win = screen.queryByText(new RegExp(config.headerMessage.win, 'i'));
  expect(moves).toBeInTheDocument();
  expect(moves).toHaveTextContent(defaultNumber);
  expect(timer).toBeInTheDocument();
  expect(timer).toHaveTextContent(defaultNumber);
  expect(win).toBeNull();
});

test('renders final values', () => {
  render(<Header win={true} moves={4} startTimer={false} />);
  const moves = screen.getByText(new RegExp(config.headerMessage.moves, 'i'));
  const timer = screen.getByText(new RegExp(config.headerMessage.timer, 'i'));
  const win = screen.queryByText(new RegExp(config.headerMessage.win, 'i'));
  expect(moves).toBeInTheDocument();
  expect(moves).toHaveTextContent('4');
  expect(timer).toBeInTheDocument();
  expect(win).toHaveTextContent(config.headerMessage.win);
});
