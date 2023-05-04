<template lang="pug">
.row.q-col-gutter-lg
  .col-12
    .text-h6.q-mb-md Trademark Checker
    q-input(v-model="trademarkList" filled type="textarea" label="Trademark List" hint="Enter your trademark list here")
    q-btn(@click="generate" color="primary" label="Search" class="q-mt-md")
  .col-12(v-if="results.length")
    .text-h6.q-mt-md Results
    .text-subtitle.q-mb-md {{ results.length }} results found
    .q-pa-md
      q-list
        q-item(v-for="item in results" clickable)
          q-item-section
            q-item-label {{ item.trademarkName }}
            q-item-label(caption lines=2) Showing results for the search term: {{ item.query }}
          q-item-section(side top)
            q-badge(outline :label="item.trademarkStatus" :color="getColor(item.trademarkStatus)")
          q-separator
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TrademarkChecker',
  data() {
    return {
      trademarkList: '',
      results: []
    };
  },

  methods: {
    async generate() {
      let trademarkList = this.trademarkList;
      if (trademarkList.includes('\n')) {
        const newTrademarkList = trademarkList.split(/[\n]/).filter((tag) => tag !== '');
        trademarkList = newTrademarkList.join(',');
      }
      const { err, res } = await this.$api.trademark.search({
        text: trademarkList,
      })
      if (err) return console.log(err.message);
      this.results = res.data;
      console.log(this.results, this.columns)

    },
    getColor(status) {
      if (status === 'LIVE') return 'green';
      if (status === 'DEAD') return 'red';
      return 'grey';
    },
  },
});
</script>
