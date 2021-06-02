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

import moment from 'moment';

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$http = util.$http;
Vue.prototype.$moment = moment;
/* eslint-disable no-new */
let vue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
router.beforeEach((to, from, next)=>{
	// console.log("to",to);
	// console.log("from",from);
	// console.log("next",next);
	// let routerName = from.name;
	// if("Login"==routerName){
	// 	// let tempMeta = [
	// 	// 	{name:"用户注册", path: "/userAdd"}
	// 	// ];
	// 	to.meta.slice(0,2);// 把原来的两个全部删除
	// 	to.meta.unshift({name:"用户注册", path: "/userAdd"});
	// }
	next();
});
export default vue;
