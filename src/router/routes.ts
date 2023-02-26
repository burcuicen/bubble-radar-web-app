import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/home.vue'),
    children: [
      { path: '', component: () => import('pages/home.vue') },
      {
        path: '/trending-keywords',
        component: () => import('pages/trending-keywords.vue'),
      },
      {
        path: '/popular-searches',
        component: () => import('pages/popular-searches.vue'),
      },
      {
        path: 'trending-topics',
        component: () => import('pages/trending-topics.vue'),
      },
      {
        path: 'tag-manager',
        component: () => import('pages/tag-manager.vue'),
      },
      {
        path: 'trademark-checker',
        component: () => import('pages/trademark-checker.vue'),
      },
      {
        path: 'my-niche-search',
        component: () => import('pages/my-niche-search.vue'),
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
