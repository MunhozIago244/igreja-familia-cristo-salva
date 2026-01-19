import { useState, useEffect } from "react";

export interface GoogleReview {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export const useGoogleReviews = (apiKey: string, placeId: string) => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiKey || !placeId) {
      setLoading(false);
      return;
    }

    const loadGoogleMapsScript = () => {
      if (
        (window as any).google &&
        (window as any).google.maps &&
        (window as any).google.maps.places
      ) {
        fetchReviews();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = fetchReviews;
      script.onerror = () => {
        setError("Erro ao carregar Google Maps SDK");
        setLoading(false);
      };
      document.head.appendChild(script);
    };

    const fetchReviews = async () => {
      if (!(window as any).google || !(window as any).google.maps || !(window as any).google.maps.places) {
        setError("Google Maps SDK not loaded.");
        setLoading(false);
        return;
      }
      try {
        const { Place } = (window as any).google.maps.places;
        const place = new Place({ id: placeId });
        await place.fetchFields({ fields: ["reviews"] });

        if (place.reviews) {
          setReviews(place.reviews);
        } else {
          setError("Não foi possível encontrar avaliações para este local.");
        }
        setLoading(false);
      } catch (err: any) {
        if (err.message.includes("API key is invalid")) {
          setError("API Key do Google Maps inválida ou não ativada. Verifique o console do Google Cloud.");
        } else {
          setError("Erro interno ao processar avaliações: " + err.message);
        }
        setLoading(false);
      }
    };

    loadGoogleMapsScript();
  }, [apiKey, placeId]);

  return { reviews, loading, error };
};
