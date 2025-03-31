<template>
  <v-btn :color="color" :variant="variant" @click="onClick" block>
    <slot />
  </v-btn>
</template>

<script lang="ts" setup>
defineProps<{
  color?: string
  variant?: 'flat' | 'elevated' | 'tonal' | 'outlined' | 'text' | 'plain'
  onClick?: () => void
}>()
</script>
