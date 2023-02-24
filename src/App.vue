<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  methods: {
    async getPosts() {
      //const response = await this.$api.
      //console.log(this.$api)
      console.log(this.$api)
    }
  }
})
</script>
