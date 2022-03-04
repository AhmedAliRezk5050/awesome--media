export interface VideoMinimized {
  id: string;
  title: string;
  imgUrl: string;
}

export type ImgSize = 'small' | 'medium' | 'large';

export interface Video {
  title: string;
  publishTime: string;
  description: string;
  channelTitle: string;
  viewCount: number;
}
