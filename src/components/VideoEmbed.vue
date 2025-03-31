<template>
  <div class="video-wrapper" data-testid="video-embed">
    <iframe
      v-if="embedUrl"
      ref="iframeRef"
      :src="embedUrl"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen
      data-testid="video-frame"
    ></iframe>

    <component
      v-if="floatingAction"
      :is="floatingAction"
      class="floating-slot"
      data-testid="floating-action"
    />

    <FloatingActionButton
      tooltip="Captura de Tela"
      :onClick="pauseVideo"
      icon="mdi-camera"
      :top="15"
      :right="15"
      data-testid="screenshot-button"
    />

    <div class="dpad-wrapper" data-testid="dpad-wrapper">
      <FloatingActionButton
        tooltip="Mover para cima"
        :onClick="() => move('up')"
        icon="mdi-arrow-up"
        :top="'-48px'"
        data-testid="btn-move-up"
      />
      <FloatingActionButton
        tooltip="Mover para baixo"
        :onClick="() => move('down')"
        icon="mdi-arrow-down"
        :top="'15px'"
        data-testid="btn-move-down"
      />
      <FloatingActionButton
        tooltip="Mover para a esquerda"
        :onClick="() => move('left')"
        icon="mdi-arrow-left"
        :left="'-55px'"
        :top="'15px'"
        data-testid="btn-move-left"
      />
      <FloatingActionButton
        tooltip="Mover para a direita"
        :onClick="() => move('right')"
        icon="mdi-arrow-right"
        :left="'55px'"
        :top="'15px'"
        data-testid="btn-move-right"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type Component, ref } from 'vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';

const props = defineProps<{
  videoUrl: string;
  floatingAction?: Component;
}>();

const iframeRef = ref<HTMLIFrameElement | null>(null);

// Simula ação de pausar o vídeo
function pauseVideo() {
  console.log('Take screenshot function');
}

function move(value: string) {
  console.log(`Move to ${value}`);
}

function extractYouTubeId(url: string): string | null {
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function extractVimeoId(url: string): string | null {
  const regex = /vimeo\.com\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

const embedUrl = computed(() => {
  if (props.videoUrl.includes('youtube.com') || props.videoUrl.includes('youtu.be')) {
    const videoId = extractYouTubeId(props.videoUrl);
    return videoId ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1` : '';
  } else if (props.videoUrl.includes('vimeo.com')) {
    const videoId = extractVimeoId(props.videoUrl);
    return videoId ? `https://player.vimeo.com/video/${videoId}` : '';
  } else {
    return '';
  }
});
</script>

<style scoped>
.video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.video-wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
  position: relative;
  z-index: 1;
}

.floating-slot {
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 10;
}

.dpad-wrapper {
  position: absolute;
  top: 80%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
}


.dpad-wrapper :deep(.fab) {
  position: absolute;
}
</style>
