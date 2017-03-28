// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Breadcrumb from './components/common/breadcrumb';
import Mock from './mock';
import App from './App';
import './style.scss';
import router from './router';

// start mock
Mock.bootstrap();
Vue.config.productionTip = false;

Vue.use(ElementUI);
// register dashboard components
Vue.component('db-breadcrumb', Breadcrumb);

// 导航钩子 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
router.beforeEach((to, from, next) => {
  // 这里可以处理判断登录的逻辑
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
