import { defineStore } from 'pinia';
import { VIDEO_PLATFORMS_URLS } from '@/constants/videoPlatforms';

export const usePlatformStore = defineStore('platform', {
  state: () => ({
    currentPlatform: 'youtube' as 'youtube' | 'vimeo',
  }),
  getters: {
    currentVideoUrl: (state) => VIDEO_PLATFORMS_URLS[state.currentPlatform],
    nextPlatformLabel: (state) =>
      state.currentPlatform === 'youtube' ? 'Vimeo' : 'YouTube',
  },
  actions: {
    togglePlatform() {
      this.currentPlatform =
        this.currentPlatform === 'youtube' ? 'vimeo' : 'youtube';
    },
  },
});
