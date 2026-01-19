import { useQuery } from '@tanstack/react-query';
import { LiveStatus } from '@/types/LiveStatus';

const fetchLiveStatus = async (): Promise<LiveStatus> => {
  const response = await fetch('/api/live-status.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();

  if (data.isLive) {
    return {
      isLive: true,
      liveUrl: `https://www.youtube.com/watch?v=${data.liveVideo.id.videoId}`,
      liveTitle: data.liveVideo.snippet.title,
      thumbnail: data.liveVideo.snippet.thumbnails.high.url,
    };
  }

  return {
    isLive: false,
    liveUrl: null,
    liveTitle: null,
    thumbnail: null,
  };
};

export const useLiveStatus = () => {
  return useQuery({
    queryKey: ['liveStatus'],
    queryFn: fetchLiveStatus,
    refetchInterval: 180000, // 3 minutes
  });
};
