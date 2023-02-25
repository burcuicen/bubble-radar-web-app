<template lang="pug">
q-layout(view="hHh LpR fFf")
  q-header.bordered(class="bg-primary text-white")
    q-toolbar
      q-btn(dense flat round icon="menu" @click="toggleLeftDrawer")
      q-toolbar-title
        | Bubble Radar
  q-drawer(show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" bordered)
  q-page-container
    router-view
  q-footer.bordered(class="bg-accent text-white")
    q-toolbar
      q-toolbar-title
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeLayout',
  data() {
    return {
      leftDrawerOpen: false,
    }
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
});
</script>
