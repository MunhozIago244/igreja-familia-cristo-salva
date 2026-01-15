import { useState, useEffect } from 'react';

// 1. Tipagem fiel à estrutura de pesquisa da YouTube API para eventos ao vivo
interface YouTubeLiveItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

interface YouTubeLiveResponse {
  items: YouTubeLiveItem[];
}

export interface LiveStatus {
  isLive: boolean;
  liveUrl: string | null;
  liveTitle: string | null;
  thumbnail: string | null;
  loading: boolean;
}

export const useLiveStatus = () => {
  const [status, setStatus] = useState<LiveStatus>({
    isLive: false,
    liveUrl: null,
    liveTitle: null,
    thumbnail: null,
    loading: true,
  });

  // 2. Utilizando as mesmas variáveis de ambiente validadas no useSermonsList
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  useEffect(() => {
    const checkLiveStatus = async () => {
      if (!apiKey || !channelId) {
        console.warn("YouTube API: Credenciais ausentes no ambiente.");
        setStatus(prev => ({ ...prev, loading: false }));
        return;
      }

      try {
        // 3. Endpoint específico para buscar transmissões ao vivo (eventType=live)
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${apiKey}`
        );

        const data: YouTubeLiveResponse = await response.json();

        if (data.items && data.items.length > 0) {
          const liveItem = data.items[0];
          setStatus({
            isLive: true,
            liveUrl: `https://www.youtube.com/watch?v=${liveItem.id.videoId}`,
            liveTitle: liveItem.snippet.title,
            thumbnail: liveItem.snippet.thumbnails.high.url,
            loading: false,
          });
        } else {
          // Caso não haja itens, não está em live
          setStatus(prev => ({ 
            ...prev, 
            isLive: false, 
            liveUrl: null, 
            loading: false 
          }));
        }
      } catch (error) {
        console.error("Erro ao verificar status da live:", error);
        setStatus(prev => ({ ...prev, isLive: false, loading: false }));
      }
    };

    checkLiveStatus();

    // 4. Polling inteligente: verifica a cada 3 minutos enquanto a aba estiver ativa
    const interval = setInterval(checkLiveStatus, 180000); 

    return () => clearInterval(interval);
  }, [apiKey, channelId]);

  return status;
};