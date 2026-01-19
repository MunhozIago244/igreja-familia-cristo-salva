import { bench, describe } from 'vitest';
import { Sermon } from '@/types/Sermon';

// A função a ser testada - extraída ou copiada para o teste de performance
const transformSermons = (data: any[]): Sermon[] => {
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

// Gera um grande volume de dados mockados
const generateMockData = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        contentDetails: { videoId: `vid${i}` },
        snippet: {
            title: `Sermon ${i} | Preacher`,
            description: `Description for sermon ${i}`,
            thumbnails: { high: { url: `http://example.com/thumb${i}.jpg` } },
            publishedAt: new Date().toISOString(),
        },
    }));
};

describe('Sermon Transformation Performance', () => {
    const smallData = generateMockData(100);
    const mediumData = generateMockData(1000);
    const largeData = generateMockData(10000);

    bench('transform 100 sermons', () => {
        transformSermons(smallData);
    });

    bench('transform 1,000 sermons', () => {
        transformSermons(mediumData);
    });

    bench('transform 10,000 sermons', () => {
        transformSermons(largeData);
    });
});
