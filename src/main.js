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
import * as CommInterface from '@/components/utils/commInterface';
import * as businessConstant from '@/components/constant/businessConstant';
import * as ComponentConstant from '@/components/constant/componentConstant';
import * as SystemConstant from '@/components/constant/systemConstant';
import tableDataFormatStrateg from "@/components/utils/table-data-format-strategy";
import moment from 'moment';

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$http = util.$http;
Vue.prototype.$moment = moment;

// 定义全局过滤器
/**
 * 将码转换为中文
 * @param {Object} value 码
 * @param {Object} type 码的类型
 */
Vue.filter('dataFormatFilter', function (value, type, name, format){
	let row = {};
	row[name] = value;
	let item = {
		type: "",
		format: "",
		formatDate: "",
		prop: ""
	};
	item.type = type;
	item.prop = name;
	item.format = format;
	if(SystemConstant.dataType.DATE==type){
		item.formatDate = SystemConstant.common.FORMAT_DATE;
	}
	return tableDataFormatStrateg.tableDataFormat.prototype.format(row, item);
});



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
