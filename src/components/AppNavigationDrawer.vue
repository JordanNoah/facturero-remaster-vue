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
        { title: 'Products', icon: 'mdi-package-variant-closed', to: '/products' },
        { title: 'Customers', icon: 'mdi-account-group', to: '/customers' },
        { title: 'Establishments', icon: 'mdi-domain', to: '/establishments' },
      ],
    }),
  }
</script>
