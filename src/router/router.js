import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./../views/HomeView.vue'),
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/articleView.vue'),
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('./../views/tableView.vue'),
  },
  {
    path: '/listview/:id',
    name: 'listview',
    component: () => import('./../views/listView.vue'),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});
export default router;
