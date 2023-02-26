export default interface ICard {
  iconName: string;
  index: number;
  hidden: boolean;
  opened: boolean;
  onClick: (index: number) => void;
}