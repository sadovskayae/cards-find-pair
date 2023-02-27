import classNames from "classnames";
import React from "react";
import { config } from "../../utils/consts";
import "./Card.scss";
import ICard from "./types";

const Card = ({
  iconName,
  index,
  hidden,
  opened,
  onClick,
}: ICard) => {
  const handleOnClick = () => !opened && !hidden && onClick(index);
  const cardClass = classNames(config.card.classModifiers.default, {
    [config.card.classModifiers.hidden]: hidden,
    [config.card.classModifiers.open]: opened
  });

  return (
    <div role={config.card.ariaRole} className={cardClass} onClick={handleOnClick}>
      <div className="card__card-side card__card-side_front">
        <span className="material-icons size">{config.card.backSideIcon}</span>
      </div>
      <div className="card__card-side card__card-side_back">
        <span className="material-icons size">{iconName}</span>
      </div>
    </div>
  );
};

export default Card;
