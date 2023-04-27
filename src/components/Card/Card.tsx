import classNames from 'classnames';
import React, { KeyboardEvent, memo } from 'react';
import { config } from '../../utils/consts';
import './Card.scss';
import CardProps from './types';

const Card = memo(({ card, index, hidden, opened, onClick }: CardProps) => {
  const handleOnClick = () => !opened && !hidden && onClick(card);
  const onEnterDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleOnClick();
    }
  };
  const cardClass = classNames(config.card.classModifiers.default, {
    [config.card.classModifiers.hidden]: hidden,
    [config.card.classModifiers.open]: opened,
  });

  return (
    <div
      role={config.card.ariaRole}
      className={cardClass}
      onClick={handleOnClick}
      tabIndex={index + 1}
      onKeyDown={onEnterDown}
    >
      <div className='card__card-side card__card-side_front'>
        <span className='material-icons size'>{config.card.backSideIcon}</span>
      </div>
      <div className='card__card-side card__card-side_back'>
        <span className='material-icons size'>{card?.name}</span>
      </div>
    </div>
  );
});

export default Card;
