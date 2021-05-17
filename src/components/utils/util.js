const eUI = require("element-ui");
const axios = require("axios");
const componentConstant = require("@/components/constant/componentConstant");

// axios 配置
let $http = axios.create({
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
            showMsg("交易失败: " + resMsg,"error");
            return false;
        }
        return res;
    },
    error => {
        return Promise.reject(error);
    });

/**
 * 消息提示
 * @param msg 显示消息
 * @param type 弹出框类型[success | warning | info | error]
 */
let showMsg = function(msg, type) {
    // 设置默认值
    if(!type){
        type = "warning";
    }
    eUI.Message({
        showClose: true,
        center: true,
        message: msg,
        type: type
    });
};
/**
 * 判断obj是否为空，空返回true
 * @param obj
 * @returns {boolean}
 */
let empty = function(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
};
/**
 * 确认框
 * @param msg 提示消息
 * @param type 消息类型[success, error, info, warning]
 * @param title 标题
 * @param btnTextOk 确认按钮显示文字
 * @param btnTextNo 取消按钮显示文字
 * @param callbackOk 确认按钮回调函数
 * @param callbackNo 取消按钮回调函数
 */
let confirm = function(msg, type, title, btnTextOk, btnTextNo, callbackOk, callbackNo) {
    // 设置默认值
    if(!type){
        type = "warning";
    }
    msg = !msg ? "是否确定删除?" : msg;
    type = !type ? "warning" : type;
    title = !title ? "提示" : title;
    btnTextOk = !btnTextOk ? "确定" : btnTextOk;
    btnTextNo = !btnTextNo ? "取消" : btnTextNo;

    eUI.MessageBox.confirm(msg, title,{
        confirmButtonText: btnTextOk,
        cancelButtonText: btnTextNo,
        type: type,
        center: true,// 内容居中显示
        callback: action => {
            if("confirm"==action){
                callbackOk();
            } else {
                if(typeof callbackNo === "function"){
                    callbackNo();
                } else {
                    showMsg("您已取消");
                }
            }
        }
    });
    // }); // 用这种方法，当不选择数据删除时，catch也会执行，callback 却不会
    // .then(()=>{// 确认
    //     console.log("12");
    //     callbackOk();
    // }).catch(()=>{// 取消
    //     console.log("34");
    //     if(typeof callbackNo === "function"){
    //         callbackNo();
    //     } else {
    //         showMsg("您已取消");
    //     }
    // });
};
/**
 * 确定框
 * @param {Object} message 消息
 * @param {Object} title 标题
 * @param {Object} type 类型
 * @param {Object} callback 回调函数
 */
let alert = function(message, title, type, callback){
	let messageTmp = !message ? "消息" : message;
	let titleTmp = !title ? "提示" : title;
	let typeTmp = !type ? componentConstant.MessageProperties.SUCCESS : type;
	eUI.MessageBox.alert(messageTmp, {
		title: titleTmp,
		type: typeTmp,
		callback: function(action, instance) {// 暂时不知道 action 为什么默认为confirm
			if(typeof callback === "function"){
				callback();
			} 
		},
		showClose: false
		
	});
};
module.exports = {
    showMsg: showMsg,
    empty: empty,
    confirm: confirm,
    $http: $http,
    alert: alert
};
