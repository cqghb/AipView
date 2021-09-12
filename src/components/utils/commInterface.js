// import vue from 'vue';
// // const util = require("util");
// import * as util from '@/components/utils/util';
// import * as componentConstant from '@/components/constant/componentConstant';
// import * as msgConstant from '@/components/constant/msgConstant';

const main = require("@/main.js");
const util = require("@/components/utils/util");
const componentConstant = require("@/components/constant/componentConstant");
const msgConstant = require("@/components/constant/msgConstant");
const systemConstant = require("@/components/constant/systemConstant");

/**
 * 发送一个get请求
 * @param {Object} uri 请求地址
 * @param {Object} param 参数
 * @param {Object} callback 回调函数，将数据返回
 */
export function baseSendGet(uri, param, callback) {
    util.$http.get(uri,{params: param}).then(function (res) {
		let info = res.data;
		return callback(info);
    });
}

/**
 * 通过主键获取用户信息
 * 通过回调函数把异步请求的数据返回
 * @param uri 请求地址
 * @param params 查询条件
 */
export function sendPost(uri, params, callback) {
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

/**
 * 跳转到登录页面
 * @returns {Promise<Route>}
 */
export function goToLogin() {
    return main.default.$router.push({
        path: "/",
        name: "Login"
    });
}
/**
 * 跳转到注册页面
 * @returns {Promise<Route>}
 */
export function goToRegister() {
    return main.default.$router.push({
        path: "/register",
        name: "register"
    });
}
/**
 * 跳转到重置密码页面
 * @returns {Promise<Route>}
 */
export function goToPassReset() {
    return main.default.$router.push({
        path: "/passwordReset",
        name: "passwordReset"
    });
}
/**
 * 查询码值数据
 * @param {Object} params 查询条件
 * @param {Object} callback 回调函数，处理响应数据
 */
// export getCodeType = await function getCodeType(param, callback) {
export function getCodeType(codeType, codeList, callback) {
    util.$http.post(systemConstant.consCodeManage.SEARCH_CODEKEY_VALUE,
		{
			"codeType": codeType,
			"codeList": codeList,
		}
	).then(function (res) {
		console.log("码值转换响应值: ", res);
		let info = res;
		return callback(info);
    });
}
export const getCodeType2 = (param) => {
	return new Promise((resolve, reject) => {
		util.$http.get(systemConstant.consCodeManage.SEARCH_CODEKEY_VALUE, {
			params: {"codeType": param}
		}).then(function (res) {
			let info = res;
			resolve(info);
		}).catch(function (error) {
			console.log(error);
			reject(error);
		});
	});
}
/**
 * 修改密码
 * @param {Object} params 密码信息
 * @param {Object} callback 回调函数
 */
export function resetPass(params, callback) {
    util.$http.post(systemConstant.consUserManage.RESET_PASS, params)
	.then(function (res) {
		let info = res.data;
		return callback(info);
    });
}

/**
 * 跳转到菜单新增页面
 * @returns {Promise<Route>}
 */
export function goToMenuAdd(params) {
    return main.default.$router.push({
        path: "/menuAdd",
        name: "MenuAdd",
		params: params
    });
}

/**
 * 转到图标列表页
 * @returns {Promise<Route>}
 */
export function goToIconList() {
    return main.default.$router.push({
        path: "/menuList",
        name: "MenuList"
    });
}