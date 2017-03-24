import Vue from 'vue';
import Router from 'vue-router';
import DashBoard from '@/pages/dashboard/dashboard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DashBoard',
      component: DashBoard,
    },
  ],
});