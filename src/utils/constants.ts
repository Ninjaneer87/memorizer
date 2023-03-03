export const PEXEL_API_KEY = 'wxB702kRQha6vrI5pCiyOj9tsSmKHmMCAwGAQDtRv0oKHgDO2UIE9YWW';
export const NUMBER_OF_PAIRS = 6;
export const FALLBACK_IMAGES = Array.from(Array(NUMBER_OF_PAIRS)).map((_n, i) => `/images/${i}.jpg`);
export enum STORAGE_KEYS {
  'IMAGES' = 'images',
  'IS_GAME_OVER' = 'isGameOver',
  'MATCHING_PAIRS_COUNT' = 'matchingPairsCount',
  'CARDS' = 'cards',
  'SCORES' = 'scores',
  'TIME' = 'time',
  'PLAYER' = 'player',
  'FIRST_CARD_INDEX' = 'firstCardIndex',
}