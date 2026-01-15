import { useState, useEffect } from 'react';

// 1. Tipagem forte para a estrutura de resposta da YouTube API
interface YouTubeSearchItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

interface YouTubeSearchResponse {
  items: YouTubeSearchItem[];
}

export interface Sermon {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  url: string;
}

export const useSermonsList = (maxResults = 12) => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&q=culto&type=video&key=${apiKey}`
        );
        
        // 2. Aplicando a interface na resposta do JSON
        const data: YouTubeSearchResponse = await response.json();

        if (data.items) {
          // 3. O 'item' agora é tipado automaticamente como YouTubeSearchItem
          const formatted: Sermon[] = data.items.map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title.split(/[|-]/)[0].trim(),
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.high.url,
            date: new Date(item.snippet.publishedAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            }),
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`
          }));
          setSermons(formatted);
        }
      } catch (error) {
        console.error("Erro ao carregar lista de pregações:", error);
      } finally {
        setLoading(false);
      }
    };

    if (apiKey && channelId) {
      fetchSermons();
    }
  }, [apiKey, channelId, maxResults]);

  return { sermons, loading };
};