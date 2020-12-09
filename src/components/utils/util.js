const eUI = require("element-ui");
const axios = require("axios");

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
 * 定义一个弹出框
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


module.exports = {
    showMsg: showMsg,
    empty: empty,
    $http: $http
};
