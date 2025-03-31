<template>
  <v-footer
    class="text-center d-flex flex-column ga-2 py-4"
    color="indigo-lighten-1"
    :height="200"
    app
  >
    <div class="d-flex">
      <v-btn
        v-for="(icon, index) in socialIcons"
        :key="index"
        :icon="icon.name"
        :href="icon.link"
        target="_blank"
        density="comfortable"
        variant="text"
      ></v-btn>
    </div>

    <v-divider class="my-2" thickness="2" width="50"></v-divider>

    <v-banner-text class="text-caption font-weight-regular opacity-60">
      Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </v-banner-text>

    <v-divider></v-divider>

    <v-banner-text>
      {{ new Date().getFullYear() }} — <strong>Stream-Video</strong>
    </v-banner-text>
  </v-footer>
</template>

<script setup lang="ts" >
const socialIcons = [
  { name: 'mdi-facebook', link: 'https://www.facebook.com' },
  { name: 'mdi-twitter', link: 'https://www.twitter.com' },
  { name: 'mdi-linkedin', link: 'https://www.linkedin.com' },
  { name: 'mdi-instagram', link: 'https://www.instagram.com' },
];
</script>
