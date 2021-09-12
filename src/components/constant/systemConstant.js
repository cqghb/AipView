// 系统变量配置
/**
 * 用户管理模块系统级别常量配置
 * @type {{QUERY_USER_BY_ID: string}}
 */
export const consUserManage = {
    QUERY_USER_BY_ID: "/queryUserById", // 根据ID查询用户ID
    ADD_USER: "/insertUser", // 新增用户
    RESET_PASS: "/resetPass", // 重置密码
    SIGN_OUT: "/signOut", // 退出登录
    UPDATE_USER_BY_ID: "/updateUser" // 根据ID修改用户ID
};
/**
 * 码值管理
 */
export const consCodeManage = {
    SEARCH_CODEKEY_VALUE: "/codeValue/searchCodeKeyValue" // 码值查询
};

/**
 * 发送验证码
 */
export const consVerCode = {
    SEND_VERIFICATION_CODE: "/mail/sendVerificationCode" // 发送验证码
};

/**
 * 公共常量
 */
export const common = {
    RET_CODE: "000000", // 成功码值
    FORMAT_DATE: "formatDate", // 成功码值
    YYYY_MM_DD_HH_mm_ss: "YYYY-MM-DD HH:mm:ss", // 日期格式
    YYYY_MM_DD: "YYYY-MM-DD" // 日期格式
};
/**
 * 数据类型
 */
export const dataType = {
    DATE: "Date", // 日期
    TEXT: "Text", // 文本
    NUMBER: "Number" // 数字
};
/**
 * 图标管理接口
 */
export const consIconManage = {
    // QUERY_ICON_BY_ID: "/icon/findPage", // 分页查询
    FIND_PAGE: "/icon/findPage", // 分页查询
    ADD_ICON: "/icon/insertIcon", // 新增图标
    DEL_ICON: "/icon/deleteIcon", // 删除图标
    QUERY_ALL: "/icon/queryAll", // 查询所有
    UPDATE_ICON_BY_ID: "/icon/updateIcon" // 修改图标
};
/**
 * 图标管理接口
 */
export const consMenuManage = {
    // QUERY_ICON_BY_ID: "/menu/findPage", // 分页查询
    FIND_PAGE: "/menu/findPage", // 分页查询
    ADD: "/insertMenu", // 新增菜单
    DEL: "/deleteMenu", // 删除菜单
    UPDATE_BY_ID: "/icon/updateMenu" // 修改菜单
};
