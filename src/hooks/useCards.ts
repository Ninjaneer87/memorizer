import { useStorage } from "hooks/useStorage";
import { useState } from "react";
import { STORAGE_KEYS } from "utils/constants";
import { usePexelImages } from "./usePexelImages";

export type CardType = {
  id: number;
  isOpen: boolean;
  isPaired: boolean;
  image: string;
  notMatching: boolean;
};

export function useCards() {
  const { cards, setCards, getNewImages, clearImages, loading } = usePexelImages();
  const [previousCard, setPreviousCard] = useState<CardType | null>();
  const [boardDisabled, setBoardDisabled] = useState(false);
  const [matchedCardsCount, setPairedCount] = useStorage(STORAGE_KEYS.MATCHED_CARDS_COUNT, 0);
  
  const createNewCards = () => {
    clearImages();
    getNewImages();
    setPreviousCard(null);
    setPairedCount(0);
  };

  const flipCard = (id: number) => {
    if (boardDisabled) return;

    const selectedCard = cards.find((c) => c.id === id);
    if (selectedCard) {
      selectedCard.isOpen = true;
      if (!previousCard) {
        setPreviousCard(selectedCard);
        return;
      }
      setBoardDisabled(true);
      matchCards(previousCard, selectedCard);
    }
  };

  const matchCards = (firstCard: CardType, secondCard: CardType) => {
    // Matching
    if (firstCard.image === secondCard.image) {
      firstCard.isPaired = true;
      secondCard.isPaired = true;

      setPreviousCard(null);
      setCards([...cards]);
      setBoardDisabled(false);
      setPairedCount((prev) => prev + 2);
      return;
    }

    // Not matching
    firstCard.notMatching = true;
    secondCard.notMatching = true;
    setCards([...cards]);

    setTimeout(() => {
      firstCard.notMatching = false;
      secondCard.notMatching = false;
      firstCard.isOpen = false;
      secondCard.isOpen = false;

      setPreviousCard(null);
      setCards([...cards]);
      setBoardDisabled(false);
    }, 1000);
  };

  return {
    flipCard,
    createNewCards,
    cards,
    matchedCardsCount,
    clearImages,
    loadingImages: loading
  };
}
