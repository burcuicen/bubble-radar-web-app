<template lang="pug">
.row.q-col-gutter-lg(v-if="ready")
  .col-12
    .text-h6.q-mb-md Trademark Checker
    .text-subtitle.q-mb-md.text-grey-8 Looking to check multiple trademarks? Our trademark checker allows you to enter multiple entries, separated by a newline, and quickly search a database of registered trademarks to determine their availability. Avoid potential legal issues and ensure your brand or product names are available for registration with our easy-to-use trademark checker. Try it out now!
    q-input(v-model="trademarkList" filled type="textarea" label="Trademark List" hint="Enter your trademark list here")
    q-btn(@click="generate" color="primary" label="Search" class="q-mt-md")
  .col-12(v-if="results.length")
    .text-h6.q-mt-md Results
    .text-subtitle.q-mb-md {{ results.length }} results found
    q-list(bordered separator)
      q-item(v-for="item in results" clickable style="padding:20px")
        q-badge(floating :color="getColor(item.trademarkStatus)" rounded)
        q-icon.q-mr-md(:name="getIcon(item.trademarkName)" size="2em" :color="getIconColor(item.trademarkName)")
        q-item-section
          q-item-label {{ item.trademarkName }}
          q-item-label(caption lines=2) Showing results for the search term:
            b(:style="getStyle(item.trademarkStatus)")  {{ item.query }}
        q-item-section(side top)
          q-badge(outline :label="item.trademarkStatus" :color="getColor(item.trademarkStatus)")
        q-separator
UnderDevelopment(v-else)
</template>
<script>
import { defineComponent } from 'vue';
import UnderDevelopment from 'src/components/under-development.vue';

export default defineComponent({
  name: 'TrademarkChecker',
  data() {
    return {
      trademarkList: '',
      results: [],
      ready: false,
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
    getIconColor(name) {
      if (name.split(' ').length > 1) return 'red';
      return 'yellow';
    },
    getIcon(name) {
      if (name.split(' ').length > 1) return 'warning';
      return 'radio_button_checked';
    },
    getColor(status) {
      if (status === 'LIVE') return 'green';
      if (status === 'DEAD') return 'red';
      return 'grey';
    },
    getStyle(status) {
      const color = this.getColor(status);
      return `color:${color};`;
    }
  },
});
</script>
