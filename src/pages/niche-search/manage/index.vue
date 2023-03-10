<template lang="pug">
.row.q-col-gutter-lg
  .col-12
    .flex.items-center.justify-between
      .text-h6 Create New Niche Search
      .flex.items-center
        q-btn(@click="$router.go(-1)" color="primary" outline label="Cancel"  class="q-mr-md")
        q-btn(@click="createNewNicheSearch" color="primary" label="Save"  class="q-mr-md")
  .col-12.col-md-4
    q-input(v-model="manage.niche" filled  label="Main Niche" hint="Enter your main focus here")
  .col-12.col-md-4
    q-input(v-model="manage.mainTag" filled  label="Main Tag" hint="Enter your main tag here")
  .col-12.col-md-4
    q-input(v-model="manage.plannedUploadCount" filled type="number" label="Planned Upload Count" hint="How much designs will you upload?")
  .col-12(v-if="manage.trendingKeywords.length")
    q-chip(v-for="keyword in manage.trendingKeywords" :key="tag"  class="q-mr-md q-mb-md" color="secondary" text-color="white" :label="keyword" removable @remove="removeKeyword(keyword)" icon-remove="close")
  .col-12
    q-input(v-model="manage.trendingKeywords" filled type="textarea" label="Keyword List" hint="Enter your keyword list here")
  .col-12
    TagManager
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TagManager from 'src/components/tagManager.vue';
import { NicheSearch, Populated, TrendingKeyword } from 'src/api/interfaces';
export default defineComponent({
  name: 'NicheSearchManage',
  components: {
    TagManager
  },
  created() {
    const id = this.$route.params.id as string;
    if (id) this.getNicheSearchItem(id);
    const keywords = localStorage.getItem('selectedKeywords') as string;
    if (!keywords) return;
    const selectedKeywords = JSON.parse(keywords) as TrendingKeyword<Populated>[];
    this.manage.trendingKeywords = selectedKeywords.map((keyword) => keyword.keyword);
  },
  beforeUnmount() {
    localStorage.removeItem('selectedKeywords');
  },
  data() {
    return {
      mode: 'create' as 'create' | 'edit',
      manage: {
        niche: '' as string,
        trendingKeywords: [] as string[],
        mainTag: '' as string,
        plannedUploadCount: 0 as number,
        tags: [] as string[]
      } as NicheSearch<Populated>,
    };
  },
  methods: {
    async getNicheSearchItem(id: string) {
      const { err, res } = await this.$api.myNicheSearch.getById(id);
      if (err) return console.log(err.message);
      //eslint-disable-next-line
      //@ts-ignore
      this.manage = res.data;
    },
    async createNewNicheSearch() {
      const { err, res } = await this.$api.myNicheSearch.create(this.manage);
      if (err) return console.log(err.message);
      this.$router.push({ name: 'MyNicheSearch' })
    },
    removeKeyword(keyword: string) {
      this.manage.trendingKeywords = this.manage.trendingKeywords.filter((item) => item !== keyword);
    },
  }
});
</script>

