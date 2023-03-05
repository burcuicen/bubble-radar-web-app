<template lang="pug">
q-table(wrap-cells flat bordered color="primary" title="My Niche Search Templates" :rows="table.rows" :columns="table.columns" row-key="_id" :loading="table.loading" :filter="table.keyword" @request="search" v-model:pagination="table.pagination" :rows-per-page-options="table.rowsPerPageOptions")
  template(#top-right="props")
    q-btn(color="primary" label="Create" icon="add" to="/my-niche-search/manage")
    q-input.q-mx-md(filled dense clearable v-model="table.keyword" style="width: 200px" placeholder="Search.." @update:model-value="search")
      template(#prepend)
        q-icon(name="search")
//UnderDevelopment
</template>
<script lang="ts">
import UnderDevelopment from 'src/components/under-development.vue';
import { defineComponent } from 'vue';
import { NicheSearch, Populated, PaginatedResult } from 'src/api/interfaces';
import { QTableProps } from 'quasar';

export default defineComponent({
  name: 'MyNicheSearch',
  components: {
    UnderDevelopment,
  },
  data() {
    return {
      table: {
        rows: [] as PaginatedResult<NicheSearch<Populated>>[],
        columns: [] as QTableProps,
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
    add() {
      this.$router.replace({ name: 'NicheSearchManage', params: { id: 'new' } })
    },
    async search() {
      const { page, rowsPerPage } = this.table.pagination
      const { err, res } = await this.$api.myNicheSearch.getAll({
        page: page,
        limit: rowsPerPage,
        text: this.table.keyword
      })
      if (err) return console.log(err.message)
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
          field: (row: { trendingKeywords: string[]; }) => row.trendingKeywords.join(', ').substring(0, 100),

        },
        {
          name: 'niche',
          label: 'Niche',
          align: 'left',
          field: (row: { niche: string; }) => row?.niche,
        },
        {
          name: 'mainTag',
          label: 'Main Tag',
          align: 'left',
          field: (row: { mainTag: string; }) => row?.mainTag,
        },
        {
          name: 'tags',
          label: 'Tags',
          align: 'left',
          field: (row: { tags: string[]; }) => row?.tags.join(', ').substring(0, 100),
        },
        {
          name: 'plannedUploadCount',
          label: 'Planned Upload Count',
          align: 'left',
          field: (row: { plannedUploadCount: number; }) => row?.plannedUploadCount,
        },

      ]
    }
  }
});
</script>

