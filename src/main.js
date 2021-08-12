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

import moment from 'moment';

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$http = util.$http;
Vue.prototype.$moment = moment;

function ws (value, type){
	return new Promise((resolve, reject) => {
		let codeZhValue = value;
		let actionName = '';
		// 这里这样if 免得在详情页面引入businessConstant常量文件
		if(businessConstant.CODE_TYPE.SEX == type){// 性别
			actionName = businessConstant.CODE_TYPE.SEX;
		} else if (businessConstant.CODE_TYPE.LIKES == type){// 爱好
			actionName = businessConstant.CODE_TYPE.LIKES;
		} else if (businessConstant.CODE_TYPE.EDUCATION == type){// 学历
			actionName = businessConstant.CODE_TYPE.EDUCATION;
		}
		if(actionName){
			let data =  CommInterface.getCodeType2(actionName).then((res)=>{
				console.log('resAAA',res);
				let data = res.data;
				for(let i=0; i<data.length; i++){
					let item = data[i];
					let label = item.label;
					let code = item.value;				
					if(value === code){
						codeZhValue = label;
						console.log('2222',codeZhValue);
						break;
					}
				}
			});
			console.log('123',data);
			resolve(codeZhValue);
		};
	});
	
	// let codeZhValue = value;
	// let actionName = '';
	// // 这里这样if 免得在详情页面引入businessConstant常量文件
	// if(businessConstant.CODE_TYPE.SEX == type){// 性别
	// 	actionName = businessConstant.CODE_TYPE.SEX;
	// } else if (businessConstant.CODE_TYPE.LIKES == type){// 爱好
	// 	actionName = businessConstant.CODE_TYPE.LIKES;
	// } else if (businessConstant.CODE_TYPE.EDUCATION == type){// 学历
	// 	actionName = businessConstant.CODE_TYPE.EDUCATION;
	// }
	// if(actionName){
	// 	let data =  CommInterface.getCodeType2(
	// 	    actionName
	// 		// ,
	// 	  //   function (res) {
	// 			// let retCode = res.code;
	// 			// let retMsg = res.msg;
	// 	  //       if(SystemConstant.common.RET_CODE == retCode){
	// 	  //           let data = res.data;
	// 			// 	for(let i=0; i<data.length; i++){
	// 			// 		let item = data[i];
	// 			// 		let label = item.label;
	// 			// 		let code = item.value;
	// 			// 		if(value === code){
	// 			// 			codeZhValue = label;
	// 			// 			console.log('2222',codeZhValue);
	// 			// 			break;
	// 			// 		}
	// 			// 	}
	// 	  //       } else {
	// 	  //           util.showMsg("码值转换失败", ComponentConstant.MessageProperties.ERROR);
	// 	  //       }
	// 	  //   }
	// 	).then((res)=>{
	// 		console.log('resAAA',res);
	// 		let data = res.data;
	// 		for(let i=0; i<data.length; i++){
	// 			let item = data[i];
	// 			let label = item.label;
	// 			let code = item.value;				
	// 			if(value === code){
	// 				codeZhValue = label;
	// 				console.log('2222',codeZhValue);
	// 				break;
	// 			}
	// 		}
	// 	});
	// 	console.log('123',data);
	// };
	// console.log('456', codeZhValue);
	// return codeZhValue;
	
}

// 定义全局过滤器
/**
 * 将码转换为中文
 * @param {Object} value 码
 * @param {Object} type 码的类型
 */
// Vue.filter('codeChangeValue', function (value, type){
// 	let t = ws(value, type);
// 	let a = value;
// 	console.log('111111',t.then((res)=>{
// 		console.log('resBBB',res);
		
// 	}));
// 	;
// 	return t;
// });



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
