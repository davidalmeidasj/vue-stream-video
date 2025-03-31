import { ref, onBeforeUnmount } from 'vue';
import { WebRTCService } from '@/services/WebRTCService';

export function useWebRTC() {
  const videoRef = ref<HTMLVideoElement | null>(null);
  const rtcService = new WebRTCService();

  const start = async () => {
    const stream = await rtcService.startCamera();
    if (videoRef.value) {
      videoRef.value.srcObject = stream;
    }
  };

  const stop = () => {
    rtcService.stopCamera();
    if (videoRef.value) {
      videoRef.value.srcObject = null;
    }
  };

  onBeforeUnmount(() => stop());

  return {
    videoRef,
    start,
    stop,
  };
}
