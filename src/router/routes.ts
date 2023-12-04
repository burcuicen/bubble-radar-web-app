import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('layouts/home.vue'),
    children: [
      { path: '', component: () => import('pages/home.vue') },
      {
        path: '/trending-keywords',
        name: 'TrendingKeywords',
        component: () => import('pages/trending-keywords.vue'),
      },
      {
        path: '/popular-searches',
        name: 'PopularSearches',
        component: () => import('pages/popular-searches.vue'),
      },
      {
        path: 'trending-topics',
        name: 'TrendingTopics',
        component: () => import('pages/trending-topics.vue'),
      },
      {
        path: 'tag-manager',
        name: 'TagManager',
        component: () => import('pages/tag-manager.vue'),
      },
      {
        path: 'trademark-checker',
        name: 'TrademarkChecker',
        component: () => import('pages/trademark-checker.vue'),
      },
      {
        path: 'my-niche-search',
        name: 'MyNicheSearch',
        component: () => import('pages/niche-search/index.vue'),
      },
      {
        path: 'my-niche-search/manage/:id*',
        name: 'NicheSearchManage',
        component: () => import('pages/niche-search/manage/index.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
