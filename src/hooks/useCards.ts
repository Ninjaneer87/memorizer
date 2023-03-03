import { useState, useCallback } from "react";
import { createClient } from "pexels";
import {
  FALLBACK_IMAGES,
  NUMBER_OF_PAIRS,
  PEXEL_API_KEY,
  STORAGE_KEYS,
} from "utils/constants";
import { useStorage } from "hooks/useStorage";
import { Photo } from "pexels/dist/types";
import { createCards } from "utils/utility";

export type CardType = {
  id: number;
  isOpen: boolean;
  isPaired: boolean;
  image: string;
  notMatching: boolean;
};

const client = createClient(PEXEL_API_KEY);

const initialImages = [] as string[];
const initialCards = [] as CardType[];

export function useCards() {
  const [images, setImages] = useStorage(STORAGE_KEYS.IMAGES, initialImages);
  const [cards, setCards] = useStorage(STORAGE_KEYS.CARDS, initialCards);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(() => {
    setLoading(true);
    
    const imagePromises = Array.from(Array(NUMBER_OF_PAIRS)).map(() => client.photos.random());
    Promise.all(imagePromises)
      .then((images) => {
        const imageUrls = images.map((i) => (i as Photo).src.tiny);
        const cards = createCards(imageUrls);
        setCards(cards);
        setImages(imageUrls);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        const cards = createCards(FALLBACK_IMAGES);
        setCards(cards);
        setImages(FALLBACK_IMAGES);
        setError(err);
        setLoading(false);
      });
  }, [setImages, setCards]);

  return {
    images,
    cards,
    error,
    loading,
    setCards,
    getNewImages: fetchImages,
  };
}
