// 系统变量配置
/**
 * 用户管理模块系统级别常量配置
 * @type {{QUERY_USER_BY_ID: string}}
 */
export const consUserManage = {
    QUERY_USER_BY_ID: "/queryUserById", // 根据ID查询用户ID
    ADD_USER: "/insertUser", // 新增用户
    UPDATE_USER_BY_ID: "/updateUser" // 根据ID修改用户ID
};
/**
 * 码值管理
 */
export const consCodeManage = {
    SEARCH_CODEKEY_VALUE: "/searchCodeKeyValue" // 码值查询
};
/**
 * 公共常量
 */
export const common = {
    RET_CODE: "000000" // 成功码值
};
