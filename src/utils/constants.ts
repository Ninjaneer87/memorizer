export const PEXELS_API_KEY = "wxB702kRQha6vrI5pCiyOj9tsSmKHmMCAwGAQDtRv0oKHgDO2UIE9YWW";
export const NUMBER_OF_PAIRS = 6;
export const FALLBACK_IMAGES = Array.from(Array(NUMBER_OF_PAIRS)).map((_n, i) => `/images/${i}.jpg`);
export enum STORAGE_KEYS {
  "IS_GAME_OVER" = "isGameOver",
  "MATCHING_PAIRS_COUNT" = "matchingPairsCount",
  "CARDS" = "cards",
  "SCORES" = "scores",
  "TIME" = "time",
  "PLAYER" = "player",
  "FIRST_CARD_INDEX" = "firstCardIndex",
  "IS_PAUSED" = "isPaused",
  "BOARD_DISABLED" = "boardDisabled",
}
export const PEXELS_HEADERS = {
  "Authorization": PEXELS_API_KEY,
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "cross-site",
};
