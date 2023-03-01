import { CardType, useCards } from "hooks/useCards";
import React, { useContext } from "react";
import { createContext } from "react";

const CardContext = createContext({});

type CardContextType = {
  cards: CardType[];
  createNewCards: () => void;
  clearImages: () => void;
  flipCard: (id: number) => void;
  matchedCardsCount: number;
  loadingImages: boolean;
};

type Props = {
  children: React.ReactNode;
};

export const CardContextProvider = ({ children }: Props) => {
  const { cards, createNewCards, flipCard, matchedCardsCount, clearImages, loadingImages } = useCards();


  const context: CardContextType = {
    cards,
    createNewCards,
    flipCard,
    matchedCardsCount,
    clearImages,
    loadingImages
  }

  return <CardContext.Provider value={context}>
    {children}
  </CardContext.Provider>
}

export const useCardContext = () => useContext(CardContext) as CardContextType;