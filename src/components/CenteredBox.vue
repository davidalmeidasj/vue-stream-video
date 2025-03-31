<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="text-center pa-4">
          <v-card-title class="text-h5">{{ title }}</v-card-title>
          <v-card-text>
            <v-btn data-testid="play-button" color="primary" @click="onAction">{{ buttonLabel }}</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  buttonLabel: string;
  onAction: () => void;
}>();
</script>
