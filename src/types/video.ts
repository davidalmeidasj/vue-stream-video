export type VideoPlatform = 'youtube' | 'vimeo';

export interface VideoData {
  url: string;
  platform: VideoPlatform;
}
