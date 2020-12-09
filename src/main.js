// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入elementUI组件
import ElementUI from 'element-ui'
// import axios from 'axios'
// 引入
import 'element-ui/lib/theme-chalk/index.css'

import * as util from '@/components/utils/util';

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$http = util.$http;

/* eslint-disable no-new */
let vue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
export default vue;
