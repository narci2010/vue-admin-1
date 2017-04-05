import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/login/login';
import NotFound from '@/pages/common/404';
import Form from '@/pages/form/form';
import List from '@/pages/list/list';
import Detail from '@/pages/detail/detail';
import Chart from '@/pages/chart/chart';

Vue.use(Router);

const root = Vue.component('root', {
  template: '<router-view></router-view>'
});

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        hidden: true
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      component: root,
      name: '首页',
      meta: {
        requiresAuth: true
      },
      redirect: '/manage',
      children: [
        {
          path: 'form',
          name: '认证',
          component: Form,
        },
        {
          path: 'chart',
          name: 'Chart',
          component: Chart,
        },
        {
          path: 'manage',
          component: root,
          name: '管理',
          meta: {
            hidden: false
          },
          children: [
            {
              path: '',
              name: '列表',
              component: List,
            },
            {
              path: 'detail',
              name: 'Detail',
              component: Detail,
            },
          ]
        },
      ]
    },
    {
      path: '*',
      redirect: {
        path: '/404'
      },
    },
  ],
});