import { useQuery } from '@tanstack/react-query';
import { SermonVideo } from '@/types/SermonVideo';

const fetchLatestSermon = async (): Promise<SermonVideo | null> => {
  const response = await fetch('/api/latest-sermon.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();

  if (data) {
    const rawTitle = data.snippet.title;
    const cleanTitle = rawTitle.split(/[-|]/)[0].trim();

    return {
      id: data.contentDetails.videoId,
      title: cleanTitle,
      thumbnail: data.snippet.thumbnails.high.url,
      publishedAt: new Date(data.snippet.publishedAt).toLocaleDateString('pt-BR'),
      url: `https://www.youtube.com/watch?v=${data.contentDetails.videoId}`
    };
  }
  return null;
};

export const useLatestSermon = () => {
  return useQuery({
    queryKey: ['latestSermon'],
    queryFn: fetchLatestSermon,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
