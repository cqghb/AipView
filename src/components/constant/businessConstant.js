// 业务常量配置

export const LOCAL_STORAGE_USER = "user";// 本地登录用户缓存
export const YES = "1";// 是
export const NO = "2";// 否
export const NO2 = "0";// 否
export const CODE_VALUE = "codeValue";// 码值
export const SELECTED_ONE_DATA = "请选择一条数据";
export const DELETED = "数据已经删除，无需再操作";
// 码值相关常量
export const CODE_TYPE = {
    EDUCATION: "education", // 学历类型
    LIKES: "likes", // 喜好类型
    MENU_DEFAULT_SELECTED: "menuDefaultSelected", // 菜单是否默认选中[展开]
    YES_OR_NO: "yesOrNo", // 公共选中项
    SEX: "sex", // 性别
    DEL_TAG: "delTag", // 是否删除
    DATA_OPERATE_SUBGROUP: "dataOperateSubgroup", // 数据操作分组
};
/**
 * 回调函数名称
 */
export const CALLBACK_FUNCTION_NAME = {
    SEARCH_DEL_TAG_OPTIONS: "searchDelTagOptions", /* 查删除标志 */
    // SEARCH_DATA_OPERATE_SUBGROUP: "searchDataOperateSubgroup", // 查数据操作分组
    SET_SPU_BRAND: "setSpuBrand", /* 设置货品品牌 */
    SET_SPU_TYPE: "setSpuType", /* 设置货品类型 */
    SET_SPU: "setSpu", /* 设置货品 */
	SET_PRO_OPT:"setProOpt",/* 设置产品属性 */
	SET_PROPERTY_VALUES:"setPropertyValues",/* 设置产品属性 */
	SET_SINGLE_SPECIFICATION:"setSingleSpecification",/* 设置产品规格-单选 */
	SET_MULTIPLE_SPECIFICATION:"setMultipleSpecification",/* 设置产品规格-多选 */
	
};

/**
 * 正则表达式
 */
export const REG = {
    REG1: "/^[A-Za-z0-9]+$/", /* 只能是字母 */
	
};
