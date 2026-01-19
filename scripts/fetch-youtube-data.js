
import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = 'UC4b8E3rNYt6w16k2d3z_o7Q'; // Hardcoded Channel ID for Familia Cristo Salva
const UPLOAD_PLAYLIST_ID = 'UU4b8E3rNYt6w16k2d3z_o7Q'; // The ID for the "Uploads" playlist is the channel ID with "UU" prefix

const API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

const fetchYouTubeData = async (endpoint, params) => {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);
  url.searchParams.append('key', YOUTUBE_API_KEY);
  for (const key in params) {
    url.searchParams.append(key, params[key]);
  }

  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`YouTube API error: ${error.error.message}`);
  }
  return response.json();
};

const getLatestSermon = async () => {
    console.log('Fetching latest sermon...');
    const data = await fetchYouTubeData('playlistItems', {
        part: 'snippet,contentDetails',
        playlistId: UPLOAD_PLAYLIST_ID,
        maxResults: 1,
    });
    console.log('Successfully fetched latest sermon.');
    return data.items[0];
};

const getSermonsList = async () => {
    console.log('Fetching sermons list...');
    const data = await fetchYouTubeData('playlistItems', {
        part: 'snippet,contentDetails',
        playlistId: UPLOAD_PLAYLIST_ID,
        maxResults: 10, // Fetching more items for the list
    });
    console.log('Successfully fetched sermons list.');
    return data.items;
};

const getLiveStatus = async () => {
  console.log('Fetching live status...');
  const data = await fetchYouTubeData('search', {
    part: 'snippet',
    channelId: CHANNEL_ID,
    eventType: 'live',
    type: 'video',
  });
  console.log('Successfully fetched live status.');
  // If there are items, a live stream is active
  return {
    isLive: data.items.length > 0,
    liveVideo: data.items.length > 0 ? data.items[0] : null,
  };
};


const cacheData = async () => {
  try {
    if (!YOUTUBE_API_KEY) {
      throw new Error('YOUTUBE_API_KEY environment variable not set.');
    }

    const publicDir = path.resolve(process.cwd(), 'public', 'api');
    await fs.mkdir(publicDir, { recursive: true });

    const [latestSermon, sermonsList, liveStatus] = await Promise.all([
      getLatestSermon(),
      getSermonsList(),
      getLiveStatus()
    ]);

    await fs.writeFile(
      path.join(publicDir, 'latest-sermon.json'),
      JSON.stringify(latestSermon, null, 2)
    );
    console.log('Successfully cached latest-sermon.json');

    await fs.writeFile(
      path.join(publicDir, 'sermons-list.json'),
      JSON.stringify(sermonsList, null, 2)
    );
    console.log('Successfully cached sermons-list.json');

    await fs.writeFile(
        path.join(publicDir, 'live-status.json'),
        JSON.stringify(liveStatus, null, 2)
      );
    console.log('Successfully cached live-status.json');


  } catch (error) {
    console.error('Error caching YouTube data:', error.message);
    process.exit(1);
  }
};

cacheData();
