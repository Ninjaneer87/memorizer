import { useState, useCallback } from "react";
import { createClient } from "pexels";
import {
  FALLBACK_IMAGES,
  NUMBER_OF_PAIRS,
  PEXEL_API_KEY,
  STORAGE_KEYS,
} from "utils/constants";
import { useStorage } from "./useStorage";
import { Photo } from "pexels/dist/types";
import { createCards } from "utils/utility";
import { CardType } from "hooks/useCards";

const client = createClient(PEXEL_API_KEY);

const initialImages = [] as string[];
const initialCards = [] as CardType[];

export function usePexelImages() {
  const [images, setImages, loaded] = useStorage(STORAGE_KEYS.IMAGES, initialImages);
  const [cards, setCards] = useStorage(STORAGE_KEYS.CARDS, initialCards);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearImages = () => {
    setImages([]);
  }

  const fetchImages = useCallback(() => {
    if (loaded) {
      setLoading(true);

      const imagePromises = [];
      for (let i = 0; i < NUMBER_OF_PAIRS; i++) {
        imagePromises.push(client.photos.random());
      }

      Promise.all(imagePromises)
        .then((responses) => Promise.all(responses))
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
    }
  }, [loaded, setImages, setCards]);

  return { images, cards, error, loading, setCards, getNewImages: fetchImages, clearImages };
}
