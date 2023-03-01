import { useEffect, useState } from "react";
import { createClient } from "pexels";
import { NUMBER_OF_PAIRS, PEXEL_API_KEY } from "utils/constants";
import { useStorage } from "./useStorage";
import { Photo } from "pexels/dist/types";
import { createCards } from "utils/utility";
import { CardType } from "hooks/useCards";

const client = createClient(PEXEL_API_KEY);

const initialImages = [] as string[];
const initialCards = [] as CardType[];

export function usePexelImages() {
  const [images, setImages, loaded] = useStorage("images", initialImages);
  const [cards, setCards] = useStorage("cards", initialCards);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loaded && !images.length) {
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
          setError(err);
          setLoading(false);
        });
    }
  }, [loaded, images, setImages, setCards]);

  return { images, cards, error, loading, setCards };
}
