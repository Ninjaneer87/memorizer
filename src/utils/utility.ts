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
  const cards = images.map((image) => ({
    isOpen: false,
    isPaired: false,
    notMatching: false,
    image,
  }));

  const pairedCards = [...cards, ...cards].map((item, i) => ({ ...item, id: i }));
  const shuffledCards = pairedCards.sort(() => Math.random() - Math.random());
  return shuffledCards;
};