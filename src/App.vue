<template>
  <v-app>
    <TopNavbar app @toggle-drawer="toggleSidebar" />
    <Sidebar app ref="sidebar" />
    <v-main>
      <router-view />
    </v-main>
    <FooterDashboard app />
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TopNavbar from '@/components/layout/TopNavbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import FooterDashboard from '@/components/layout/FooterDashboard.vue'

const sidebar = ref<InstanceType<typeof Sidebar> | null>(null);

function toggleSidebar() {
  sidebar.value?.toggleDrawer();
}
</script>
