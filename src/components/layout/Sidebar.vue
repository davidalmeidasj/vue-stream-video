<template>
  <v-navigation-drawer app v-model="drawer" temporary>
    <v-list>
      <!-- Item da lista com ícone antes do título -->
      <v-list-item link to="/" prepend-icon="mdi-home">
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from 'vue';

const drawer = ref(false);

function toggleDrawer() {
  drawer.value = !drawer.value;
}

defineExpose({ toggleDrawer });
</script>
