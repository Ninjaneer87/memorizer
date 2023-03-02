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
  const [previousCard, setPreviousCard] = useState<CardType | null>();
  const [boardDisabled, setBoardDisabled] = useState(false);
  const [matchedCount, setMatchedCount] = useStorage(STORAGE_KEYS.MATCHED_COUNT, 0);
  
  const getNewCards = useCallback(() => {
    clearImages();
    getNewImages();
    setPreviousCard(null);
    setMatchedCount(0);
  }, [clearImages, getNewImages, setMatchedCount]);

  const matchCards = useCallback((firstCard: CardType, secondCard: CardType) => {
    // Matching
    if (firstCard.image === secondCard.image) {
      firstCard.isPaired = true;
      secondCard.isPaired = true;

      setPreviousCard(null);
      setCards([...cards]);
      setBoardDisabled(false);
      setMatchedCount((prev) => ++prev);
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
  }, [cards, setCards, setMatchedCount]);

  const flipCard = useCallback((id: number) => {
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
  }, [boardDisabled, matchCards, cards, previousCard]);

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