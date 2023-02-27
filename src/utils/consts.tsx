export const config = {
  delay: {
    completedCards: 500,
    clearEqualPair: 1000,
    clearPair: 1500,
  },
  headerMessage: {
    name: 'Find pair',
    win: 'Congratulations! You beat the game!',
    moves: 'Moves:',
    timer: 'Time:',
    bestResult: 'Your best result: ',
  },
  card: {
    ariaRole: 'button',
    classModifiers: {
      open: 'card_opened',
      hidden: 'card_hidden',
      default: 'card',
    },
    backSideIcon: 'question_mark',
  },
  record: {
    localStorageName: 'record',
  },
};

export const iconNames = [
  'fingerprint',
  'star_rate',
/*   'face',
  'language',
  'lightbulb',
  'savings',
  'flutter_dash',
  'flight_land',
  'blender',
  'yard',
  'train',
  'music_note',
  'skateboarding',
  'emoji_food_beverage',
  'catching_pokemon',
  'interests',
  'rowing',
  'tsunami', */
];

export const testIconNames = ['fingerprint', 'face', 'fingerprint', 'face'];
