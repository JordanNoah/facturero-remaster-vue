<template>
  <v-navigation-drawer app clipped permanent rail>
    <v-list nav>
      <v-list-item
        v-for="item in navigationItems"
        :key="item.title"
        density="compact"
        link
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.to"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
  export default {
    data: () => ({
      navigationItems: [
        { title: 'Invoice', icon: 'mdi-invoice-list-outline', to: '/invoices' },
      ],
    }),
  }
</script>
