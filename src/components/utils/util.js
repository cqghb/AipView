// import vue from 'vue';
const eUI = require("element-ui");
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
}


module.exports = {
    showMsg: showMsg
};
