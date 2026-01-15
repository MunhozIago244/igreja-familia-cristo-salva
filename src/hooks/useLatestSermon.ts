import { useState, useEffect } from 'react';

export interface SermonVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}

export const useLatestSermon = () => {
  const [data, setData] = useState<SermonVideo | null>(null);
  const [loading, setLoading] = useState(true);

  // O Vite exige o prefixo VITE_ para expor ao client-side
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&q=culto&type=video&key=${apiKey}`
        );
        const result = await response.json();

        if (result.items?.[0]) {
          const video = result.items[0];
          
          // Limpeza técnica do título (remove "Família Cristo Salva" ou datas do título)
          const rawTitle = video.snippet.title;
          const cleanTitle = rawTitle.split(/[-|]/)[0].trim();

          setData({
            id: video.id.videoId,
            title: cleanTitle,
            thumbnail: video.snippet.thumbnails.high.url,
            publishedAt: new Date(video.snippet.publishedAt).toLocaleDateString('pt-BR'),
            url: `https://www.youtube.com/watch?v=${video.id.videoId}`
          });
        }
      } catch (error) {
        console.error("YouTube API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (apiKey && channelId) fetchVideo();
  }, [apiKey, channelId]);

  return { data, loading };
};