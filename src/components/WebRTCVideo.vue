<template>
  <div class="video-wrapper">
    <video
      ref="videoRef"
      autoplay
      playsinline
      muted
      class="video"
      data-testid="local-video"
    ></video>

    <FloatingActionButton
      tooltip="Iniciar Câmera"
      :onClick="start"
      icon="mdi-play"
    />
    <FloatingActionButton
      tooltip="Parar Câmera"
      :onClick="stop"
      icon="mdi-stop"
    />
  </div>
</template>

<script lang="ts" setup>
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import { useWebRTC } from '@/composables/useWebRTC';

const { videoRef, start, stop } = useWebRTC();
</script>

<style scoped>
.video-wrapper {
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

video {
  width: 640px;
  height: 360px;
  background-color: black;
}
</style>
