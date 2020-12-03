// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入elementUI组件
import ElementUI from 'element-ui'
import axios from 'axios'
// 引入
import 'element-ui/lib/theme-chalk/index.css'
import util from './components/utils/util'

// axios 配置
var $http = axios.create({
  baseURL: '/p',
  timeout: '3000'
});
// 统一处理后台的响应
$http.interceptors.response.use(responde => {
      console.log("后台响应数据: ", responde);
      let res = responde.data;
      let resCode = res.code;
      let resMsg = res.msg;
      if("999999" == resCode){
        util.showMsg("交易失败: " + resMsg,"error");
        return false;
      }
      return res;
    },
    error => {
      return Promise.reject(error);
    });

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = $http

/* eslint-disable no-new */
let vue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
export default vue;
