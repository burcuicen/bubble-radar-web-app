<template lang="pug">
q-table(wrap-cells flat bordered color="primary" title="My Niche Search Templates" :rows="table.rows" :columns="table.columns" row-key="_id" :loading="table.loading" :filter="table.keyword" @request="search" v-model:pagination="table.pagination" :rows-per-page-options="table.rowsPerPageOptions")
  template(#top-right="props")
    q-input.q-mx-md(filled dense clearable v-model="table.keyword" style="width: 200px" placeholder="Search.." @update:model-value="search")
      template(#prepend)
        q-icon(name="search")
//UnderDevelopment
</template>
<script lang="ts">
import UnderDevelopment from 'src/components/under-development.vue';
import { defineComponent } from 'vue';
import { NicheSearch, Populated } from 'src/api/interfaces';

export default defineComponent({
  name: 'MyNicheSearch',
  components: {
    UnderDevelopment,
  },
  data() {
    return {
      table: {
        rows: [] as NicheSearch<Populated>[],
        columns: [] as any[],
        loading: false,
        keyword: '',
        pagination: {
          page: 1,
          rowsPerPage: 10
        },
        rowsPerPageOptions: [10, 20, 30, 50, 100]
      }
    }
  },
  created() {
    this.table.columns = this.setColumns()
    this.search()
  },
  watch: {
    //watch table.pagination
    'table.pagination': {
      handler() {
        this.search()
      },
      deep: true
    }
  },
  methods: {
    async search() {
      const { page, rowsPerPage } = this.table.pagination
      const { err, res } = await this.$api.trending.getAll({
        page: page,
        limit: rowsPerPage,
        text: this.table.keyword
      })
      if (err) return this.$q.notify({ type: 'negative', message: err.message })
      //eslint-disable-next-line
      //@ts-ignore
      this.table.rows = res.data
    },
    setColumns() {
      return [
        {
          name: 'trendingKeywords',
          label: 'Keyword List',
          align: 'left',
          format: (val: string[]) => {
            return val.map((keyword) => keyword).join(', ').slice(0, 100)
          },
        },
        {
          name: 'niche',
          label: 'Niche',
          align: 'left',
        },
        {
          name: 'tags',
          label: 'Tags',
          align: 'left',
          format: (val: string[]) => {
            return val.map((tag) => tag).join(', ').slice(0, 100)
          },
        },
        {
          name: 'plannedUploadCount',
          label: 'Planned Upload Count',
          align: 'left',
        },
        {
          name: 'createdAt',
          label: 'Created At',
          align: 'left',
          format: (val: string) => {
            return new Date(val).toLocaleString()
          },
        },

      ]
    }
  }
});
</script>

