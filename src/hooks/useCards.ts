import { useState, useCallback, useRef } from "react";
import { FALLBACK_IMAGES, STORAGE_KEYS, PEXELS_HEADERS } from "utils/constants";
import { useStorage } from "hooks/useStorage";
import { Photos } from "pexels/dist/types";
import { createCards, pexelsUrl } from "utils/utility";

export type CardType = {
  id: number;
  isOpen: boolean;
  isPaired: boolean;
  image: string;
  notMatching: boolean;
};

const initialCards = [] as CardType[];

export function useCards() {
  const [cards, setCards, getCards] = useStorage(STORAGE_KEYS.CARDS, initialCards);
  const [isFetching, setIsFetching] = useState(false);
  const abortControllerRef = useRef(new AbortController());

  const createNewCards = useCallback(async () => {
    abortControllerRef.current.abort();
    setIsFetching(true);

    try {
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;
      const response = await fetch(pexelsUrl(), { headers: PEXELS_HEADERS, signal});
      const images = await response.json() as Photos;
      const urls = images.photos.map((i) => i.src.tiny);
      const cards = createCards(urls);
      setCards(cards);
      setIsFetching(false);
    } catch (error: any) {
      if(error.name !== "AbortError") {
        const cards = createCards(FALLBACK_IMAGES);
        setCards(cards);
        setIsFetching(false);
      }
    }
  }, [setCards]);

  return {
    cards,
    setCards,
    getCards,
    isFetching,
    createNewCards,
  };
}
