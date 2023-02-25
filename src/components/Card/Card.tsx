import classNames from "classnames";
import React from "react";
import "./Card.scss";

const Card = ({
  iconName,
  index,
  hidden,
  opened,
  onClick,
}: {
  iconName: string;
  index: number;
  hidden: boolean;
  opened: boolean;
  onClick: (index: number) => void;
}) => {
  const handleOnClick = () => !opened && !hidden && onClick(index);

  return (
    <div className={classNames('card', {
      'card_hidden': hidden,
      'card_opened': opened
    })}
    onClick={handleOnClick}>
      <div className="card__card-side card__card-side_front">
        <span className="material-icons md-48">question_mark</span>
      </div>
      <div className="card__card-side card__card-side_back">
        <span className="material-icons md-48">{iconName}</span>
      </div>
    </div>
  );
};

export default Card;
