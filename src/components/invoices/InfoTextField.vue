<template>
  <div>
    <div v-if="!showModify" @click="showModify=true">
      <span>asdasd</span>
    </div>
    <div v-else class="d-flex align-center">
      <v-text-field append-inner-icon="mdi-content-save-outline" class="mr-2" density="compact" @click:append-inner="saveInfo()" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InfoTextField',
    data: () => ({
      showModify: false,
    }),
    methods: {
      saveInfo () {
        this.showModify = false
      },
    },
  }
</script>
