import type { InjectionKey } from 'vue';

export const TogglePlatformKey: InjectionKey<() => void> = Symbol('TogglePlatform');
export const CurrentPlatformKey: InjectionKey<'youtube' | 'vimeo'> = Symbol('CurrentPlatform');
