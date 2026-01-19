import { useQuery } from '@tanstack/react-query';
import { Sermon } from '@/types/Sermon';

const fetchSermons = async (): Promise<Sermon[]> => {
  const response = await fetch('/api/sermons-list.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();

  if (data) {
    return data.map((item: any) => ({
      id: item.contentDetails.videoId,
      title: item.snippet.title.split(/[|-]/)[0].trim(),
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      date: new Date(item.snippet.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      url: `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`
    }));
  }
  return [];
};

export const useSermonsList = () => {
  return useQuery({
    queryKey: ['sermonsList'],
    queryFn: fetchSermons,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
