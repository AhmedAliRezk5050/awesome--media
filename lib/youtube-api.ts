import { YoutubeErrorResponse, YoutubeSuccessResponse } from './../data/type';
import { Video } from '../components/types';
import _backupData from '../data/videos.json';

const backupData: YoutubeSuccessResponse = _backupData;

const mapVideos = (response: YoutubeSuccessResponse) =>
  response.items.map(({ id, snippet }) => ({
    id: id.videoId,
    title: snippet.title,
    imgUrl: snippet.thumbnails.high.url,
  }));

export const getVideos = async (searchQuery: string): Promise<Video[]> => {
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
    if (errorResponse.error.message.includes('quota')) {
      return mapVideos(backupData);
    } else {
      throw new Error('Failed To Fetch');
    }
  }

  const jsonResponse: YoutubeSuccessResponse = await response.json();
  return mapVideos(jsonResponse);
};
