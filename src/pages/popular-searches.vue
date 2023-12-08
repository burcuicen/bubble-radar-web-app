<template lang="pug">
q-table(wrap-cells flat bordered color="primary" title="Popular Searches" :rows="table.rows" :columns="table.columns" row-key="_id" :loading="table.loading" :filter="table.keyword" @request="search" v-model:pagination="table.pagination" :rows-per-page-options="table.rowsPerPageOptions")
  template(#top-right="props")
    q-input.q-mx-md(filled dense clearable v-model="table.keyword" style="width: 200px" placeholder="Search.." @update:model-value="search")
      template(#prepend)
        q-icon(name="search")
  template(#body-cell-actions="props")
    q-td.text-no-wrap(:props="props")
      q-btn.q-mr-md(flat round dense size="11px" icon="content_copy" @click="copyKeyword(props.row.label)")
        q-tooltip Copy
      q-btn(flat round dense size="11px" icon="link" @click="navigate(props.row.label)")
        q-tooltip Navigate

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
    },
    'table.keyword': {
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
    copyKeyword(keyword) {
      navigator.clipboard.writeText(keyword)
    },
    navigate(keyword) {
      const url = `https://www.redbubble.com/shop/?query=${keyword}`
      window.open(url, '_blank')
    },
    setColumns() {
      return [
        {
          name: 'label',
          required: true,
          label: 'Keyword',
          align: 'left',
          field: row => row.keywords,
          format: val => `${val}`,
          sortable: false
        },
        {
          name: 'actions',
          label: 'Actions',
          field: 'actions',
          align: 'center',
          sortable: false,
          style: 'width: 100px'
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
      const { data } = res.data

      this.table.rows = data
    }
  },
})
</script>
