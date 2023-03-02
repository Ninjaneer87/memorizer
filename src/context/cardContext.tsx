import { CardType, useCards } from "hooks/useCards";
import { useStorage } from "hooks/useStorage";
import React, { useContext, useState, useCallback } from "react";
import { createContext } from "react";
import { STORAGE_KEYS } from "utils/constants";

type CardContextType = {
  cards: CardType[];
  getNewCards: () => void;
  clearImages: () => void;
  flipCard: (id: number) => void;
  matchingPairsCount: number;
  loadingImages: boolean;
};
type Props = {
  children: React.ReactNode;
};

const CardContext = createContext({});

export const CardContextProvider = ({ children }: Props) => {
  const { cards, setCards, getNewImages, clearImages, loading } = useCards();
  const [previousCardId, setPreviousCardId] = useState<number | null>(null);
  const [boardDisabled, setBoardDisabled] = useState(false);
  const [matchingPairsCount, setMatchingPairsCount] = useStorage(STORAGE_KEYS.MATCHING_PAIRS_COUNT, 0);

  const getNewCards = useCallback(() => {
    clearImages();
    getNewImages();
    setPreviousCardId(null);
    setMatchingPairsCount(0);
  }, [clearImages, getNewImages, setMatchingPairsCount]);

  const matchCards = useCallback((firstCard: CardType, secondCard: CardType, clonedCards: CardType[]) => {
    // Matching
    if (firstCard.image === secondCard.image) {
      firstCard.isPaired = true;
      secondCard.isPaired = true;

      setPreviousCardId(null);
      setCards(clonedCards);
      setBoardDisabled(false);
      setMatchingPairsCount((prev) => ++prev);
      return;
    }

    // Not matching
    firstCard.notMatching = true;
    secondCard.notMatching = true;
    setCards(clonedCards);

    setTimeout(() => {
      firstCard.notMatching = false;
      secondCard.notMatching = false;
      firstCard.isOpen = false;
      secondCard.isOpen = false;

      setPreviousCardId(null);
      setCards(clonedCards);
      setBoardDisabled(false);
    }, 1000);
  }, [setCards, setMatchingPairsCount]);

  const flipCard = useCallback((selectedCardId: number) => {
    if (boardDisabled) return;

    const clonedCards = cards.map(c => ({ ...c }));
    const selectedCard = clonedCards.find((c) => c.id === selectedCardId);
    if (selectedCard) {
      selectedCard.isOpen = true;

      if (previousCardId === null) {
        setPreviousCardId(selectedCard.id);
        setCards(clonedCards);
        return;
      }

      const previousCard = clonedCards.find((c) => c.id === previousCardId);
      if (previousCard) {
        setBoardDisabled(true);
        matchCards(previousCard, selectedCard, clonedCards);
      }
    }
  }, [boardDisabled, matchCards, cards, previousCardId, setCards]);

  const context: CardContextType = {
    cards,
    getNewCards,
    flipCard,
    matchingPairsCount,
    clearImages,
    loadingImages: loading
  }

  return <CardContext.Provider value={context}>
    {children}
  </CardContext.Provider>
}

export const useCardContext = () => useContext(CardContext) as CardContextType;