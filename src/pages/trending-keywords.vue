<template lang="pug">
q-table(wrap-cells flat bordered color="primary" title="Trending Keywords" :rows="table.rows" :columns="table.columns" row-key="_id" :loading="table.loading" :filter="table.keyword" @request="search" v-model:pagination="table.pagination" :rows-per-page-options="table.rowsPerPageOptions" selection="multiple" v-model:selected="selectedKeywords")
  template(#top-right="props")
    q-input.q-mx-md(filled dense clearable v-model="table.keyword" style="width: 200px" placeholder="Search.." @update:model-value="search")
      template(#prepend)
        q-icon(name="search")
    q-btn(@click="createNewNicheSearch" color="primary" label="Create New Niche Search" icon="add" class="q-mr-md")
  template(#body-cell-actions="props")
    q-td.text-no-wrap(:props="props")
      q-btn.q-mr-md(flat round dense size="11px" icon="content_copy" @click="copyKeyword(props.row.keyword)")
        q-tooltip Copy
      q-btn(flat round dense size="11px" icon="link" @click="navigate(props.row.keyword)")
        q-tooltip Navigate
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TrendingKeywordsList',
  data() {
    return {
      selectedKeywords: [],
      table: {
        rows: [],
        columns: [],
        loading: false,
        keyword: '',
        pagination: {
          page: 1,
          rowsPerPage: 10
        },
        rowsPerPageOptions: [10, 20, 30, 50, 100, -1]
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
    cleanDuplicateData() {
      this.table.rows = this.table.rows.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.label === thing.labell
        ))
      )

    },
    createNewNicheSearch() {
      localStorage.setItem('selectedKeywords', JSON.stringify(this.selectedKeywords))
      this.$router.push({ name: 'NicheSearchManage' })
    },
    setColumns() {
      return [
        {
          name: 'keyword',
          required: true,
          label: 'Keyword',
          align: 'left',
          field: row => row.label,
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
    copyKeyword(keyword) {
      navigator.clipboard.writeText(keyword)
    },
    async search() {
      const { page, rowsPerPage } = this.table.pagination
      const { err, res } = await this.$api.trending.getAll({
        page: page,
        limit: rowsPerPage,
        text: this.table.keyword
      })
      if (err) return this.$q.notify({ type: 'negative', message: err.message })
      const { data } = res.data
      this.table.rows = data
    },
    navigate(keyword) {
      const url = `https://www.redbubble.com/shop/?query=${keyword}`
      window.open(url, '_blank')
    }
  },
})
</script>
