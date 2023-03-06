import { CardType, useCards } from "hooks/useCards";
import { usePreventReload } from "hooks/usePreventReload";
import { useStorage } from "hooks/useStorage";
import { useContext, useCallback, useMemo, PropsWithChildren, useEffect } from "react";
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
  const { cards, setCards, getCards, createNewCards, isFetching } = useCards();
  const [, setFirstCardIndex, getFirstCardIndex] = useStorage<number | null>(STORAGE_KEYS.FIRST_CARD_INDEX, null);
  const [boardDisabled, setBoardDisabled, getBoardDisabled] = useStorage(STORAGE_KEYS.BOARD_DISABLED, false);
  const [matchingPairsCount, setMatchingPairsCount] = useStorage(STORAGE_KEYS.MATCHING_PAIRS_COUNT, 0);
  usePreventReload(boardDisabled);

  useEffect(() => {
    setBoardDisabled(false);
  }, [setBoardDisabled])

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
      setCards([...clonedCards]);
      setBoardDisabled(false);
    }, 1000);
  }, [setCards, setMatchingPairsCount, setFirstCardIndex, setBoardDisabled]);

  const flipCard = useCallback((selectedCardIndex: number) => {
    if (getBoardDisabled()) return;

    const clonedCards = getCards();
    const selectedCard = clonedCards[selectedCardIndex];
    selectedCard.isOpen = true;

    const firstCardIndex = getFirstCardIndex();
    if (firstCardIndex === null) {
      setFirstCardIndex(selectedCardIndex);
      setCards(clonedCards);
      return;
    }

    const firstCard = clonedCards[firstCardIndex];
    setBoardDisabled(true);
    matchCards(firstCard, selectedCard, clonedCards);
  }, [ getCards, setCards, getFirstCardIndex, setFirstCardIndex, getBoardDisabled, setBoardDisabled, matchCards]);

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