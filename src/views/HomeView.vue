<template>
  <v-main>
    <CenteredBox
      title="Bem-vindo ao Stream-Video"
      button-label="Assistir"
      :onAction="openVideo"
    />
    <BaseFullscreenDialog v-model="isModalOpen">
      <VideoEmbed
        :videoUrl="platformStore.currentVideoUrl"
        :floating-action="floatingActionButton"
      />
    </BaseFullscreenDialog>
  </v-main>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import { usePlatformStore } from '@/stores/platform';

import CenteredBox from '@/components/CenteredBox.vue';
import BaseFullscreenDialog from '@/components/BaseFullscreenDialog.vue';
import VideoEmbed from '@/components/VideoEmbed.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';

const isModalOpen = ref(false);
const platformStore = usePlatformStore();

function openVideo() {
  isModalOpen.value = true;
}

const floatingActionButton = h(FloatingActionButton, {
  tooltip: `Trocar para ${platformStore.nextPlatformLabel}`,
  onClick: platformStore.togglePlatform,
  icon: 'mdi-swap-horizontal',
  top: 16,
  left: 16,
});
</script>
