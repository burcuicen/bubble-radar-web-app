<template lang="pug">
q-layout(view="hHh Lpr lff" class="shadow-2 rounded-borders")
  q-header.elevated(class="bg-primary")
    q-toolbar
      q-btn(flat @click="drawer = !drawer" round dense icon="menu")
      q-toolbar-title Bubble Radar
  q-drawer(v-model="drawer" show-if-above :mini="miniState" @mouseover="miniState = false" @mouseout="miniState = true" :width="250" :breakpoint="500" bordered class="bg-grey-2" style="overflow: hidden")
    b-sidebar
  q-page-container
    q-page.q-pa-xl
      router-view
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BSidebar from 'components/sidebar.vue'

export default defineComponent({
  name: 'HomeLayout',
  components: {
    BSidebar
  },
  data() {
    return {
      leftDrawerOpen: false,
      drawer: false,
      miniState: true
    }
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
});
</script>
