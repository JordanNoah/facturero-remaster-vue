<template>
  <v-app>
    <AppNavigationDrawer />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import AppNavigationDrawer from './components/AppNavigationDrawer.vue'
</script>
