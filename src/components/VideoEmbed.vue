<template>
  <div class="video-wrapper" data-testid="video-embed">
    <!-- Vídeo -->
    <iframe
      v-if="embedUrl"
      ref="iframeRef"
      :src="embedUrl"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen
      data-testid="video-frame"
    ></iframe>

    <!-- Canvas sobreposto -->
    <canvas
      ref="canvasRef"
      class="overlay-canvas"
      :class="{ active: drawingEnabled }"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
    />

    <!-- Botão flutuante customizado -->
    <component
      v-if="floatingAction"
      :is="floatingAction"
      class="floating-slot"
      data-testid="floating-action"
    />

    <!-- Botão para ativar/desativar desenho -->
    <FloatingActionButton
      :tooltip="drawingEnabled ? 'Desativar Desenho' : 'Ativar Desenho'"
      :onClick="toggleCanvas"
      :icon="drawingEnabled ? 'mdi-pencil-off' : 'mdi-pencil'"
      :top="15"
      :right="15"
      data-testid="toggle-drawing-button"
    />

    <!-- Botões de movimentação -->
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
import { computed, ref, type Component, onMounted, watch } from 'vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';

const props = defineProps<{
  videoUrl: string;
  floatingAction?: Component;
}>();

const iframeRef = ref<HTMLIFrameElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const drawingEnabled = ref(false);
let isDrawing = false;

function toggleCanvas() {
  drawingEnabled.value = !drawingEnabled.value;
}

function shouldDraw() {
  return drawingEnabled.value && canvasRef.value;
}

function getMousePos(e: MouseEvent) {
  const canvas = canvasRef.value!;
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

function startDrawing(e: MouseEvent) {
  if (!shouldDraw()) return;
  const ctx = canvasRef.value!.getContext('2d');
  if (!ctx) return;
  isDrawing = true;
  const { x, y } = getMousePos(e);
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function draw(e: MouseEvent) {
  if (!isDrawing || !shouldDraw()) return;
  const ctx = canvasRef.value!.getContext('2d');
  if (!ctx) return;
  const { x, y } = getMousePos(e);
  ctx.lineTo(x, y);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.stroke();
}

function stopDrawing() {
  if (!shouldDraw()) return;
  const ctx = canvasRef.value!.getContext('2d');
  if (!ctx) return;
  isDrawing = false;
  ctx.closePath();
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

// Redimensiona o canvas para cobrir o iframe
function resizeCanvasToMatchIframe() {
  const canvas = canvasRef.value;
  const iframe = iframeRef.value;
  if (canvas && iframe) {
    const rect = iframe.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  }
}

onMounted(() => {
  resizeCanvasToMatchIframe();
  window.addEventListener('resize', resizeCanvasToMatchIframe);
});

watch(drawingEnabled, (enabled) => {
  if (enabled) {
    resizeCanvasToMatchIframe();
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

.overlay-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  display: none;
  pointer-events: none;
}

.overlay-canvas.active {
  display: block;
  pointer-events: auto;
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
