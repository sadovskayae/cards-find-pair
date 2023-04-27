import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { config, testCards } from '../../utils/consts';

const backSideIcon = new RegExp(config.card.backSideIcon, 'i');

test('renders default values', () => {
  render(
    <Card
      index={1}
      card={testCards[1]}
      hidden={false}
      opened={false}
      onClick={() => {}}
    />
  );
  const linkElement = screen.getByText(backSideIcon);
  expect(linkElement).toBeInTheDocument();
});
