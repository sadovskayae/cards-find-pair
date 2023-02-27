import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { config, testIconNames } from '../../utils/consts';

const backSideIcon = new RegExp(config.card.backSideIcon, 'i');

test('renders default values', () => {
  render(
    <Card
      iconName={testIconNames[1]}
      index={1}
      hidden={false}
      opened={false}
      onClick={() => {}}
    />
  );
  const linkElement = screen.getByText(backSideIcon);
  expect(linkElement).toBeInTheDocument();
});
