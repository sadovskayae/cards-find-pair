import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

test('renders learn react link', () => {
  render(<Card iconName='face' index={1} hidden={true} opened={false} onClick={() => {}}/>);
  const linkElement = screen.getAllByText(/question_mark/i)[0];
  expect(linkElement).toBeInTheDocument();
});
