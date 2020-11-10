// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入elementUI组件
import ElementUI from 'element-ui'
import Axios from 'axios'
// 引入
import 'element-ui/lib/theme-chalk/index.css'

// axios 配置
var $http = Axios.create({
  baseURL: '/p',
  timeout: '3000'
})

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = $http

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
