import Vue from 'vue';
import VueRouter from 'vue-router';
const _import = require('src/utils/import.ts')._import(ENV);
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    component: _import('board/board'),
    name: '',
  },
  // {
  //   path: '/upload',
  //   component: _import('/Upload'),
  //   name: 'upload',
  // },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
