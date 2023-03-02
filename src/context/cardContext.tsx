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
  matchedCount: number;
  loadingImages: boolean;
};
type Props = {
  children: React.ReactNode;
};

const CardContext = createContext({});

export const CardContextProvider = ({ children }: Props) => {
  const { cards, setCards, getNewImages, clearImages, loading } = useCards();
  const [firstCardId, setFirstCardId] = useState<number | null>();
  const [boardDisabled, setBoardDisabled] = useState(false);
  const [matchedCount, setMatchedCount] = useStorage(STORAGE_KEYS.MATCHED_COUNT, 0);
  
  const getNewCards = useCallback(() => {
    clearImages();
    getNewImages();
    setFirstCardId(null);
    setMatchedCount(0);
  }, [clearImages, getNewImages, setMatchedCount]);

  const matchCards = useCallback((firstCard: CardType, secondCard: CardType, clonedCards: CardType[]) => {
    // Matching
    if (firstCard.image === secondCard.image) {
      firstCard.isPaired = true;
      secondCard.isPaired = true;

      setFirstCardId(null);
      setCards(clonedCards);
      setBoardDisabled(false);
      setMatchedCount((prev) => ++prev);
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

      setFirstCardId(null);
      setCards(clonedCards);
      setBoardDisabled(false);
    }, 1000);
  }, [setCards, setMatchedCount]);

  const flipCard = useCallback((selectedCardId: number) => {
    if (boardDisabled) return;

    const clonedCards = [...cards];
    const selectedCard = clonedCards.find((c) => c.id === selectedCardId);
    if (selectedCard) {
      selectedCard.isOpen = true;

      if (!firstCardId) {
        setFirstCardId(selectedCard.id);
        return;
      }

      const firstCard = clonedCards.find((c) => c.id === firstCardId);
      if(firstCard) {
        setBoardDisabled(true);
        matchCards(firstCard, selectedCard, clonedCards);
      }
    }
  }, [boardDisabled, matchCards, cards, firstCardId]);

  const context: CardContextType = {
    cards,
    getNewCards,
    flipCard,
    matchedCount,
    clearImages,
    loadingImages: loading
  }

  return <CardContext.Provider value={context}>
    {children}
  </CardContext.Provider>
}

export const useCardContext = () => useContext(CardContext) as CardContextType;