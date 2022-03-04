export interface YoutubeSuccessResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: YoutubeSuccessResponseVideoInfo[];
}

export interface YoutubeSuccessResponseVideoInfo {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
  statistics?: statistics;
}

interface statistics {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface Thumbnails {
  default: Default;
  medium: Default;
  high: Default;
}

interface Default {
  url: string;
  width: number;
  height: number;
}

interface Id {
  kind: string;
  videoId: string;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface YoutubeErrorResponse {
  error: Error2;
}

interface Error2 {
  code: number;
  message: string;
  errors: Error[];
}

interface Error {
  message: string;
  domain: string;
  reason: string;
}
