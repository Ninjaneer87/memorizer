import { useStorage } from "hooks/useStorage";
import { useState } from "react";
import { resetCards } from "utils/utility";
import { usePexelImages } from "./usePexelImages";

export type CardType = {
  id: number;
  pairId: number;
  isOpen: boolean;
  isPaired: boolean;
  image: string;
  notMatching: boolean;
};

export function useCards() {
  const { cards, setCards } = usePexelImages();
  const [previousCard, setPreviousCard] = useState<CardType | null>();
  const [boardDisabled, setBoardDisabled] = useState(false);
  const [pairedCount, setPairedCount] = useStorage("pairedCount", 0);

  const newDeal = () => {
    const resetedCards = resetCards(cards);
    setCards(resetedCards);
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
    if (firstCard.pairId === secondCard.pairId) {
      firstCard.isPaired = true;
      secondCard.isPaired = true;

      setPreviousCard(null);
      setCards([...cards]);
      setBoardDisabled(false);
      setPairedCount((prev) => prev + 2);
      return;
    }

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
    }, 1500);
  };

  return {
    flipCard,
    newDeal,
    cards,
    pairedCount,
  };
}
