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
