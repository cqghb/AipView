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
    UPDATE_USER_BY_ID: "/updateUser", // 根据ID修改用户ID
    QUERY_ALL: "/queryAllUser", // 查询所有有效用户
};
/**
 * 码值管理
 */
export const consCodeManage = {
    SEARCH_CODEKEY_VALUE: "/codeValue/searchCodeKeyValue", // 码值查询
    FIND_PAGE_CHILDREN: "/codeValue/findPageChildren", // 数据操作列表查询
    FIND_PAGE_CHILDREN2: "/codeValue/findPageChildren2", // 数据操作
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
    ADD: "/icon/insertIcon", // 新增图标
    DEL: "/icon/deleteIcon", // 删除图标
    QUERY_ALL: "/icon/queryAll", // 查询所有
    UPDATE: "/icon/updateIcon", // 修改图标
    QUERY_BY_ID: "/icon/queryIconById", // 根据ID查询图标详情
	UPDATE_DEL_TAG: "/icon/updateDelTag", // 逻辑删除图标
};
/**
 * 菜单管理接口
 */
export const consMenuManage = {
    QUERY_BY_ID: "/menu/queryMenuById", // 通过ID查询
    // FIND_PAGE: "/menu/findPage", // 分页查询
    ADD: "/menu/insertMenu", // 新增菜单
    DEL: "/menu/deleteMenu", // 删除菜单
    QUERY_MENU: "/menu/queryMenu", // 后管左侧菜单树
    QUERY_LIST: "/menu/queryMenuList", // 后管左侧菜单树
    QUERY_PARENT_MENU: "/menu/queryParentMenu", // 分页查询所有父菜单
    UPDATE: "/menu/updateMenu",// 维护菜单
	QUERY_MENU_ALL: "/menu/queryMenuAll",// 用户菜单配置右侧树
};
/**
 * 组件Path
 */
export const consComponentPath = {
    MENU_DETAIL: "/menuDetail", // 菜单详情
    MENU_UPDATE: "/menuUpdate", // 维护菜单
    LIST_MENU: "/menuList", // 菜单列表
    ADD_ROLE: "/roleAddu", // 添加角色
    LIST_ROLE: "/roleList", // 角色列表
    UPDATE_ROLE: "/roleUpdate", // 维护角色
    LIST_DOP: "/menuAuthList", // 操作列表
    ADD_DOP: "/dopAdd", // 新增操作
    UPDATE_DOP: "/dopUpdate", // 维护操作
    DETAIL_DOP: "/dopDetail", // 操作详情
    LIST_DOSL: "/menuDataOperateShipList", // 菜单操作关系列表
    DETAIL_DOSL: "/menuDataOperateShipDetail", // 菜单操作关系详情
    UPDATE_DOSL: "/menuDataOperateShipSetting", // 菜单操作关系维护
    ADD_ICON: "/iconAdd", // 新增图标
	LIST_ICON: "/iconList", // 图标列表
	UPDATE_ICON: "/iconUpdate", // 维护图标
	LIST_SPECIFICATION_GROUP: "/specificationGroupList", // 产品规格分组列表
	ADD_SPECIFICATION_GROUP: "/addSpecificationGroup", // 添加产品规格分组
	UPDATE_SPECIFICATION_GROUP: "/updateSpecificationGroup", // 维护产品规格分组
	LIST_SPECIFICATION: "/listSpecification", // 产品规格列表
	ADD_SPECIFICATION: "/addSpecification", // 添加产品规格
	SELECT_SPECIFICATION_GROUP_ADD_SPECIFICATION: "/addSpecification/selectSpecificationGroup", // 选择产品规格分组
	SELECT_SPU_TYPE_ADD_SPECIFICATION: "/addSpecification/selectSpuType", // 选择货品类型
	UPDATE_SPECIFICATION: "/updateSpecification", // 维护产品规格
	SELECT_SPECIFICATION_GROUP_UPDATE_SPECIFICATION: "/updateSpecification/selectSpecificationGroup2", // 选择产品规格分组
	SELECT_SPU_TYPE_UPDATE_SPECIFICATION: "/updateSpecification/selectSpuType2", // 选择货品类型
	DETAIL_SPECIFICATION: "/detailSpecification", // 维护产品规格
};
/**
 * 组件名称
 */
export const consComponentName = {
    MENU_DETAIL: "MenuDetail", // 菜单详情组件名称
    MENU_UPDATE: "MenuUpdate", // 维护菜单组件名称
    LIST_MENU: "MenuList", // 菜单列表组件名称
    ADD_ROLE: "RoleAdd", // 添加角色
    LIST_ROLE: "RoleList", // 角色列表
	UPDATE_ROLE: "RoleUpdate", // 维护角色
	LIST_DOP: "MenuAuthList", // 操作列表
	ADD_DOP: "DopAdd", // 新增操作
	UPDATE_DOP: "DopUpdate", // 维护操作
	DETAIL_DOP: "DopDetail", // 操作详情
	LIST_DOSL: "MenuDataOperateShipList", // 菜单操作关系列表
	DETAIL_DOSL: "MenuDataOperateShipDetail", // 菜单操作关系详情
	UPDATE_DOSL: "MenuDataOperateShipSetting", // 菜单操作关系维护
	ADD_ICON: "IconAdd", // 添加角色
	LIST_ICON: "IconList", // 图标列表
	UPDATE_ICON: "IconUpdate", // 维护图标
	LIST_SPECIFICATION_GROUP: "SpecificationGroupList", // 产品规格分组列表
	ADD_SPECIFICATION_GROUP: "AddSpecificationGroup", // 添加产品规格分组
	UPDATE_SPECIFICATION_GROUP: "UpdateSpecificationGroup", // 维护产品规格分组
	LIST_SPECIFICATION: "ListSpecification", // 产品规格列表
	ADD_SPECIFICATION: "AddSpecification", // 添加产品规格
	SELECT_SPECIFICATION_GROUP_ADD_SPECIFICATION: "SelectSpecificationGroup", // 选择产品规格分组
	SELECT_SPU_TYPE_ADD_SPECIFICATION: "SelectSpuType", // 选择货品类型
	UPDATE_SPECIFICATION: "UpdateSpecification", // 维护产品规格
	SELECT_SPECIFICATION_GROUP_UPDATE_SPECIFICATION: "SelectSpecificationGroup2", // 选择产品规格分组
	SELECT_SPU_TYPE_UPDATE_SPECIFICATION: "SelectSpuType2", // 选择货品类型
	DETAIL_SPECIFICATION: "DetailSpecification", // 维护产品规格
};
/**
 * 子组件调用父组件方法名称
 */
export const consChildrenCompUseParentComp = {
	UPDATE_PARENT_PROPERTY: "updateParentProperty",// 子组件调用父组件方法名称
}

/**
 * 角色管理接口
 */
export const consRoleManage = {
    FIND_PAGE: "/role/findPage", // 分页查询
    QUERY_ALL: "/role/queryAllRole", // 查询所有
    ADD: "/role/insertRole", // 新增角色
    // DEL: "/role/deleteRole", // 删除角色
    UPDATE: "/role/updateRole", // 修改角色
	QUERY_BY_ID: "/role/queryById", // 通过ID查询
	UPDATE_DEL_TAG: "/role/updateRoleDelTag", // 逻辑删除角色
};

/**
 * 数据操作管理接口
 */
export const consDopManage = {
    FIND_PAGE: "/dataOperate/findPage", // 分页查询
    ADD: "/dataOperate/insertDop", // 新增数据操
    UPDATE: "/dataOperate/updateDop", // 修改数据操
	QUERY_BY_ID: "/dataOperate/queryById", // 通过ID查询
	UPDATE_DEL_TAG: "/dataOperate/updateDelTag", // 逻辑删除数据操
};

/**
 * 数据操作管理接口
 */
export const consMenuDataOperateRelationManage = {
    // FIND_PAGE: "/menuDataOperateRelation/findPage", // 分页查询
    // ADD: "/menuDataOperateRelation/insertDop", // 新增数据操
    UPDATE: "/menuDataOperateRelation/updateMenuDataOperateRelation", // 修改数据操
	QUERY_BY_MENU_ID: "/menuDataOperateRelation/queryMenuDataOperation", // 通过菜单ID查询
	// UPDATE_DEL_TAG: "/menuDataOperateRelation/updateDelTag", // 逻辑删除数据操
};

/**
 * 角色菜单关系接口
 */
export const consRoleMenuRelationManage = {
    UPDATE: "/roleMenuRelation/updateRoleMenuRelation", // 修改角色菜单关系
	QUERY_RELATION_BY_ROLE_ID: "/roleMenuRelation/queryRoleMenu", // 通过角色ID查询角色所有菜单
};

/**
 * 用户角色关系接口
 */
export const consUserRoleRelationManage = {
    UPDATE: "/roleUserRelation/updateUserRoleRelation", // 修改用户角色菜单关系
	QUERY_RELATION_BY_USER_ID: "/roleUserRelation/queryUserRoleByUserId", // 根据用户ID查询出所有角色权限
};

/**
 * 产品规格组管理接口
 */
export const consSpecificationGroupManage = {
    FIND_PAGE: "/specificationGroup/findPage", // 产品规格分组列表查询
    QUERY_BY_ID: "/specificationGroup/queryById", // 通过主键查询
	UPDATE_DEL_TAG: "/specificationGroup/updateDelTag", // 逻辑删除操作
	ADD: "/specificationGroup/insertSpecificationGroup", // 添加
	UPDATE: "/specificationGroup/updateSpecificationGroup", // 维护
};
/**
 * 产品规格管理接口
 */
export const consSpecificationManage = {
    FIND_PAGE: "/specification/findPage", // 产品规格分组列表查询
    QUERY_BY_ID: "/specification/queryById", // 通过主键查询queryDetail
    QUERY_DETAIL: "/specification/queryDetail", // 通过主键查询详细信息
	UPDATE_DEL_TAG: "/specification/updateDelTag", // 逻辑删除操作
	ADD: "/specification/insertSpecification", // 添加
	UPDATE: "/specification/updateSpecification", // 维护
};

/**
 * 货品类型管理接口
 */
export const consSpuTypeManage = {
    FIND_PAGE: "/spuType/findPage", // 产品规格分组列表查询
    QUERY_BY_ID: "/spuType/queryById", // 通过主键查询
	UPDATE_DEL_TAG: "/spuType/updateDelTag", // 逻辑删除操作
	ADD: "/spuType/insertSpuType", // 添加
	UPDATE: "/spuType/updateSpuType", // 维护
};