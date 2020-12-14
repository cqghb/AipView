// import vue from 'vue';
// // const util = require("util");
// import * as util from '@/components/utils/util';
// import * as componentConstant from '@/components/constant/componentConstant';
// import * as msgConstant from '@/components/constant/msgConstant';

const main = require("@/main.js");
const util = require("@/components/utils/util");
const componentConstant = require("@/components/constant/componentConstant");
const msgConstant = require("@/components/constant/msgConstant");

/**
 * 通过主键获取用户信息
 * 通过回调函数把异步请求的数据返回
 * @param uri 请求地址
 * @param params 查询条件
 */
export function getUserById(uri, params, callback) {
    console.log('params',params);
    console.log('uri',uri);
    util.$http.post(uri, params).then(function (res) {
        if(!util.empty(uri)){
            let info = res.data;
            return callback(info);
        } else {
            util.showMsg(msgConstant.msgCommon.URL_NOT_NULL,componentConstant.MessageProperties.ERROR);
        }

    });
}

/**
 * 转到用户列表页
 * @returns {Promise<Route>}
 */
export function goToUserList() {
    return main.default.$router.push({
        path: "/userList",
        name: "UserList"
    });
}

/**
 * 跳转到用户详情页面
 * @param id 用户主键
 * @returns {Promise<Route>}
 */
export function goToUserDetail(id) {
    return main.default.$router.push({
        path: "/userDetail",
        name: "UserDetail",
        params: {
            id: id,
            id2: "1",
            id3: "2"
        }
    });
}

/**
 * 跳转到用户新增页面
 * @returns {Promise<Route>}
 */
export function goToUserAdd() {
    return main.default.$router.push({
        path: "/userAdd",
        name: "UserAdd"
    });
}
