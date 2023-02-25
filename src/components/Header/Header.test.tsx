import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders learn react link', () => {
  render(<Header win={false} moves={0} startTimer={false}/>);
  const linkElement = screen.getByText(/Moves/i);
  expect(linkElement).toBeInTheDocument();
});
