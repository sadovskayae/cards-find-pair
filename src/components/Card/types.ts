import { CardData } from '../../utils/types';

export default interface CardProps {
  card: CardData;
  index: number;
  hidden: boolean;
  opened: boolean;
  onClick: (card: CardData) => void;
}
