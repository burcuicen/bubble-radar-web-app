<template lang="pug">
q-table(wrap-cells flat bordered color="primary" title="Popular Searches" :rows="table.rows" :columns="table.columns" row-key="_id" :loading="table.loading" :filter="table.keyword" @request="search" v-model:pagination="table.pagination" :rows-per-page-options="table.rowsPerPageOptions")
  template(#top-right="props")
    q-input.q-mx-md(filled dense clearable v-model="table.keyword" style="width: 200px" placeholder="Search.." @update:model-value="search")
      template(#prepend)
        q-icon(name="search")

</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'PopularSearchesList',
  data() {
    return {
      table: {
        rows: [],
        columns: [],
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
  watch: {
    //watch table.pagination
    'table.pagination': {
      handler() {
        this.search()
      },
      deep: true
    }
  },
  created() {
    this.table.columns = this.setColumns()
    this.search()
  },
  methods: {
    setColumns() {
      return [
        {
          name: 'keyword',
          required: true,
          label: 'Keyword',
          align: 'left',
          field: row => row.keyword,
          format: val => `${val}`,
          sortable: false
        }
      ]
    },
    async search() {
      const { page, rowsPerPage } = this.table.pagination
      const { err, res } = await this.$api.popular.getAll({
        page: page,
        limit: rowsPerPage,
        text: this.table.keyword
      })
      if (err) return this.$q.notify({ type: 'negative', message: err.message })
      this.table.rows = res.data
    }
  },
})
</script>
