import { CardType, useCards } from "hooks/useCards";
import { usePreventReload } from "hooks/usePreventReload";
import { useStorage } from "hooks/useStorage";
import { useContext, useState, useCallback, useMemo, PropsWithChildren } from "react";
import { createContext } from "react";
import { STORAGE_KEYS } from "utils/constants";

type CardContextType = {
  cards: CardType[];
  getNewCards: () => void;
  flipCard: (id: number) => void;
  matchingPairsCount: number;
  creatingNewCards: boolean;
  setMatchingPairsCount: (value: number | ((val: number) => number)) => void
};

const CardContext = createContext({});

export const CardContextProvider = ({ children }: PropsWithChildren) => {
  const { cards, setCards, createNewCards, isFetching } = useCards();
  const [firstCardIndex, setFirstCardIndex] = useStorage<number | null>(STORAGE_KEYS.FIRST_CARD_INDEX, null);
  const [boardDisabled, setBoardDisabled] = useState(false);
  const [matchingPairsCount, setMatchingPairsCount] = useStorage(STORAGE_KEYS.MATCHING_PAIRS_COUNT, 0);
  usePreventReload(boardDisabled);

  const getNewCards = useCallback(async () => {
    await createNewCards();
    setFirstCardIndex(null);
    setMatchingPairsCount(0);
  }, [createNewCards, setMatchingPairsCount, setFirstCardIndex]);

  const matchCards = useCallback((firstCard: CardType, secondCard: CardType, clonedCards: CardType[]) => {
    // Matching
    if (firstCard.image === secondCard.image) {
      firstCard.isPaired = true;
      secondCard.isPaired = true;
      setFirstCardIndex(null);
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
      setFirstCardIndex(null);
      setCards(clonedCards);
      setBoardDisabled(false);
    }, 1000);
  }, [setCards, setMatchingPairsCount, setFirstCardIndex]);

  const flipCard = useCallback((selectedCardIndex: number) => {
    if (boardDisabled) return;

    const clonedCards = cards.map(c => ({ ...c }));
    const selectedCard = clonedCards[selectedCardIndex];
    selectedCard.isOpen = true;

    if (firstCardIndex === null) {
      setFirstCardIndex(selectedCardIndex);
      setCards(clonedCards);
      return;
    }

    const firstCard = clonedCards[firstCardIndex];
    setBoardDisabled(true);
    matchCards(firstCard, selectedCard, clonedCards);
  }, [boardDisabled, matchCards, cards, firstCardIndex, setCards, setFirstCardIndex]);

  const context: CardContextType = useMemo(() => ({
    cards,
    getNewCards,
    flipCard,
    matchingPairsCount,
    creatingNewCards: isFetching,
    setMatchingPairsCount
  }), [cards, getNewCards, flipCard, matchingPairsCount, isFetching, setMatchingPairsCount])

  return <CardContext.Provider value={context}>
    {children}
  </CardContext.Provider>
}

export const useCardContext = () => useContext(CardContext) as CardContextType;