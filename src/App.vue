<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  created() {
    this.getTrending();
    this.getPopularSearches();
  },
  methods: {
    async getTrending() {
      const { err, res } = await this.$api.trending.getAll();
      if (err) {
        console.error(err);
      } else {
        console.log(res);
      }

    },
    async createKeywords(letter: string) {
      const { err, res } = await this.$api.trending.createByAlphabet(letter);
      if (err) {
        console.error(err);
      } else {
        console.log(res);
      }
    },
    async getPopularSearches() {
      const { err, res } = await this.$api.popular.getAll();
      if (err) {
        console.error(err);
      } else {
        console.log(res);
      }
    }
  }
})
</script>
