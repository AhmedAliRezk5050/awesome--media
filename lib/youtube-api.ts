import { YoutubeErrorResponse, YoutubeSuccessResponse } from './../data/type';
import { Video, VideoMinimized } from '../components/types';
import _backupData from '../data/videos.json';

const backupData: YoutubeSuccessResponse = _backupData;

const mapVideosMinimized = (response: YoutubeSuccessResponse) =>
  response.items.map(({ id, snippet }) => ({
    id: id.videoId,
    title: snippet.title,
    imgUrl: snippet.thumbnails.high.url,
  }));

const mapVideo = (response: YoutubeSuccessResponse): Video | undefined => {
  console.log('response----', response);

  if (response.items.length === 0) {
    return;
  }

  const { snippet, statistics } = response.items[0];
  const viewCount = statistics?.viewCount ? parseInt(statistics?.viewCount) : 0;
  return {
    title: snippet.title || '',
    publishTime: snippet.publishedAt || '',
    description: snippet.description || '',
    channelTitle: snippet.channelTitle || '',
    viewCount,
  };
};

const fetchVideosFromApi = async (searchQuery: string) => {
  return fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&maxResults=25`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getVideos = async (
  searchQuery: string,
): Promise<VideoMinimized[]> => {
  if (process.env.DEVELOPEMENT) {
    console.log('process.env.DEVELOPEMENT', process.env.DEVELOPEMENT);

    return mapVideosMinimized(_backupData);
  }
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&maxResults=25`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    const errorResponse: YoutubeErrorResponse = await response.json();
    throw new Error(errorResponse.error.message);
  }

  const jsonResponse: YoutubeSuccessResponse = await response.json();
  return mapVideosMinimized(jsonResponse);
};

export const getVideo = async (id: string): Promise<Video | undefined> => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet&key=${process.env.YOUTUBE_API_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    const errorResponse: YoutubeErrorResponse = await response.json();
    throw new Error(errorResponse.error.message);
  }

  const jsonResponse: YoutubeSuccessResponse = await response.json();
  return mapVideo(jsonResponse);
};
