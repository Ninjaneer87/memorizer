import { CardType } from "hooks/useCards";

export const formatTime = (ms: number) => {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);

  const hours = h ? `${h}h` : "";
  const minutes = m ? `${m % 60}min` : "";
  const seconds = `${s % 60}s`;

  return `${hours} ${minutes} ${seconds}`.trim();
};

export const createCards = (images: string[]) => {
  const imgs = images.map((image) => ({
    isOpen: false,
    isPaired: false,
    notMatching: false,
    image
  }));

  const pairs = [...imgs, ...imgs].map((item, i) => ({ ...item, id: i }));
  const cards = shuffleCards(pairs);
  return cards;
};

export const shuffleCards = (cards: CardType[]) => {
  return [...cards.sort(() => Math.random() - Math.random())];
};

export const resetCards = (cards: CardType[]) => {
  const resetedCards = cards.map((c) => {
    const newC = { ...c };
    newC.isOpen = false;
    newC.isPaired = false;
    return newC;
  });

  return shuffleCards(resetedCards)
}
