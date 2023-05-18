export interface KeyValue<T> {
  [key: string]: T;
}

export interface CardData {
  name: string;
  id: string;
}

export interface IBestValue {
  move: number;
  time: number;
}
