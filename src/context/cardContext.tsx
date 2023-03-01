import { CardType, useCards } from "hooks/useCards";
import React, { useContext } from "react";
import { createContext } from "react";

const CardContext = createContext({});

type CardContextType = {
  cards: CardType[];
  newDeal: () => void;
  flipCard: (id: number) => void;
  pairedCount: number;
};

type Props = {
  children: React.ReactNode;
};

export const CardContextProvider = ({ children }: Props) => {
  const { cards, newDeal, flipCard, pairedCount } = useCards();

  const context: CardContextType = {
    cards,
    newDeal,
    flipCard,
    pairedCount
  }

  return <CardContext.Provider value={context}>
    {children}
  </CardContext.Provider>
}

export const useCardContext = () => useContext(CardContext) as CardContextType;