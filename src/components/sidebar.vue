<template lang="pug">
q-scroll-area.fit(:horizontal-thumb-style="{ opacity: 0 }")
  q-list(padding)
    q-item(clickable v-ripple v-for="item in menu" :key="item.title" :to="item.to")
      q-item-section(avatar)
        q-icon(:name="item.icon" )
      q-item-section {{ item.title }}
q-page-container
  router-view
  </template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BSidebar',
  data() {
    return {
      menu: [
        {
          title: 'Trending Keywords',
          icon: 'trending_up',
          to: '/trending-keywords'
        },
        {
          title: 'Trending Topics',
          icon: 'topic',
          to: '/trending-topics'
        },
        {
          title: 'Popular Searches',
          icon: 'travel_explore',
          to: '/popular-searches'
        },
        {
          title: 'Tag Manager',
          icon: 'tag',
          to: '/tag-manager'
        },
        {
          title: 'Trademark Checker',
          icon: 'copyright',
          to: '/trademark-checker'
        },
        {
          title: 'My Niche Search',
          icon: 'troubleshoot',
          to: '/my-niche-search'
        }
      ]
    }
  },
});
</script>
