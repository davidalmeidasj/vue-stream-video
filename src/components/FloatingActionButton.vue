<template>
  <v-tooltip :location="tooltipLocation">
    <template v-slot:activator="{ props: tooltipProps }">
      <v-btn
        class="fab"
        :icon="icon"
        v-bind="tooltipProps"
        :style="positionStyles"
        @click="onClick"
      />
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script lang="ts" setup>
import { computed, type StyleValue } from 'vue';

const props = defineProps<{
  tooltip: string;
  onClick: () => void;
  icon?: string;
  tooltipLocation?: 'top' | 'bottom' | 'left' | 'right';
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
}>();

const positionStyles = computed<StyleValue>(() => ({
  position: 'absolute',
  zIndex: 10,
  ...(props.top !== undefined && { top: addUnit(props.top) }),
  ...(props.bottom !== undefined && { bottom: addUnit(props.bottom) }),
  ...(props.left !== undefined && { left: addUnit(props.left) }),
  ...(props.right !== undefined && { right: addUnit(props.right) }),
}));

const icon = computed(() => props.icon || 'mdi-swap-horizontal');
const tooltipLocation = computed(() => props.tooltipLocation || 'top');

function addUnit(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}
</script>

<style scoped>

</style>
