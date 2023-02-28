<template lang="pug">
q-btn(
  color="primary"
  label="Create"
  @click="create"
)
//UnderDevelopment
</template>
<script lang="ts">
import UnderDevelopment from 'src/components/under-development.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MyNicheSearch',
  components: {
    UnderDevelopment,
  },
  methods: {
    async create() {
      const data = {
        trendingKeywords: ['here for shenanigans st patricks day', 'st patricks day reading'],
        mainTag: 'st patricks day reading',
        tags: [],
        niche: 'st patricks day',
        plannedUploadCount: 10,
      }
      const { err, res } = await this.$api.myNicheSearch.create(data)
      if (err) return this.$q.notify({ type: 'negative', message: err.message })
      this.$q.notify({ type: 'positive', message: 'Created' })

    }
  }
});
</script>
