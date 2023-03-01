import { useStorage } from "hooks/useStorage";
import { useState } from "react";
import { StorageKeys } from "utils/constants";
import { usePexelImages } from "./usePexelImages";

export type CardType = {
  id: number;
  isOpen: boolean;
  isPaired: boolean;
  image: string;
  notMatching: boolean;
};

export function useCards() {
  const { cards, setCards, newImages, clearImages, loading } = usePexelImages();
  const [previousCard, setPreviousCard] = useState<CardType | null>();
  const [boardDisabled, setBoardDisabled] = useState(false);
  const [pairedCount, setPairedCount] = useStorage(StorageKeys.PAIRED_COUNT, 0);
  
  const newCards = () => {
    clearImages();
    newImages();
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
    newCards,
    cards,
    pairedCount,
    clearImages,
    loadingImages: loading
  };
}
