import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import PasswordReset from '@/components/PasswordReset'
import Home from '@/components/Home'
import UserList from '@/components/user/UserList'
import SimpleDetailPage from '@/components/common/SimpleDetailPage'
import UserUpdate from '@/components/user/UserUpdate'
import UserDetail from '@/components/user/UserDetail'
import UserAdd from '@/components/user/UserAdd'
import MenuList from '@/components/menu/MenuList'
import MenuAdd from '@/components/menu/MenuAdd'
import MenuDetail from '@/components/menu/MenuDetail'
import MenuUpdate from '@/components/menu/MenuUpdate'
import MenuAuthList from '@/components/authority_manage/data_operate/MenuAuthList'
import RoleList from '@/components/authority_manage/role/RoleList'
import RoleAdd from '@/components/authority_manage/role/RoleAdd'
import RoleDetail from '@/components/authority_manage/role/RoleDetail'
import RoleUpdate from '@/components/authority_manage/role/RoleUpdate'
import RoleMenuList from '@/components/authority_manage/role_menu/RoleMenuList'
import UserRoleList from '@/components/authority_manage/user_role/UserRoleList'
import DopAdd from '@/components/authority_manage/data_operate/DopAdd'
import DopUpdate from '@/components/authority_manage/data_operate/DopUpdate'
import DopDetail from '@/components/authority_manage/data_operate/DopDetail'
import MenuDataOperateShipList from '@/components/authority_manage/menu_data_operate_ship/MenuDataOperateShipList'
import MenuDataOperateShipDetail from '@/components/authority_manage/menu_data_operate_ship/MenuDataOperateShipDetail'
import MenuDataOperateShipSetting from '@/components/authority_manage/menu_data_operate_ship/MenuDataOperateShipSetting'
import MenuDataOperateShipSetting2 from '@/components/authority_manage/menu_data_operate_ship/MenuDataOperateShipSetting2'
import IconList from '@/components/icon/IconList'
import IconAdd from '@/components/icon/IconAdd'
import IconUpdate from '@/components/icon/IconUpdate'
import SpecificationGroupList from '@/components/commodity/specification_group/SpecificationGroupList'
import SelectSpecificationGroup from '@/components/commodity/specification_group/SelectSpecificationGroup'
import SelectSpecificationGroup2 from '@/components/commodity/specification_group/SelectSpecificationGroup'
import AddSpecificationGroup from '@/components/commodity/specification_group/AddSpecificationGroup'
import UpdateSpecificationGroup from '@/components/commodity/specification_group/UpdateSpecificationGroup'
import ListSpecification from '@/components/commodity/specification/ListSpecification'
import AddSpecification from '@/components/commodity/specification/AddSpecification'
import UpdateSpecification from '@/components/commodity/specification/UpdateSpecification'
import DetailSpecification from '@/components/commodity/specification/DetailSpecification'
import ListSpuType from '@/components/commodity/spu_type/ListSpuType'
import SelectSpuType from '@/components/commodity/spu_type/SelectSpuType'
import SelectSpuType2 from '@/components/commodity/spu_type/SelectSpuType'
import AddSpuType from '@/components/commodity/spu_type/AddSpuType'
import UpdateSpuType from '@/components/commodity/spu_type/UpdateSpuType'
import DetailSpuType from '@/components/commodity/spu_type/DetailSpuType'
import ListProperty from '@/components/commodity/property/ListProperty'
import AddProperty from '@/components/commodity/property/AddProperty'
import SelectSpuTypeProperty from '@/components/commodity/spu_type/SelectSpuType'
import DetailProperty from '@/components/commodity/property/DetailProperty'
import UpdateProperty from '@/components/commodity/property/UpdateProperty'
import SelectSpuTypeUpdateProperty from '@/components/commodity/spu_type/SelectSpuType'
import ListPropertyOption from '@/components/commodity/property_options/ListPropertyOption'
import AddPropertyOption from '@/components/commodity/property_options/AddPropertyOption'
import AddPOSelectProperty from '@/components/commodity/property/SelectProperty'
import UpdatePropertyOption from '@/components/commodity/property_options/UpdatePropertyOption'
import UpdatePOSelectProperty from '@/components/commodity/property/SelectProperty'
import DetailPropertyOption from '@/components/commodity/property_options/DetailPropertyOption'
import ListSkuPropertyOption from '@/components/commodity/sku_property_option/ListSkuPropertyOption'
// import AddSkuPropertyOption from '@/components/commodity/sku_property_option/AddSkuPropertyOption'
import UpdateSkuPropertyOption from '@/components/commodity/sku_property_option/UpdateSkuPropertyOption'
import UpdateSelectPropertyOption from '@/components/commodity/property_options/SelectPropertyOption'
import DetailSkuPropertyOption from '@/components/commodity/sku_property_option/DetailSkuPropertyOption'

import ListSpuBrand from '@/components/commodity/spu_brand/ListSpuBrand'
import DetailSpuBrand from '@/components/commodity/spu_brand/DetailSpuBrand'
import UpdateSpuBrand from '@/components/commodity/spu_brand/UpdateSpuBrand'
import AddSpuBrand from '@/components/commodity/spu_brand/AddSpuBrand'


import ListSkuSpecificationOption from '@/components/commodity/sku_specification_option/ListSkuSpecificationOption'





const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
	routes: [{
			path: "/home",
			name: "Home",
			component: Home,
			meta: {
				title: "首页"
			},
			children: [{
				path: "/helloWorld",
				name: "HelloWorld",
				component: HelloWorld,
				meta: {
					title: "欢迎页"
				}
			}, {
				path: "/userList",
				name: "UserList",
				component: UserList,
				meta: [{
					name: "用户列表",
					path: "/userList"
				}]
				// ,// demo 留着不删
				// children:[
				//   {
				//     path: "/simpleDetailPage",
				//     name: "SimpleDetailPage",
				//     component: SimpleDetailPage,
				//     meta: {
				//       title: "用户详情页面demo"
				//     }
				//   }
				// ]
			}, {
				path: "/userDetail",
				name: "UserDetail",
				component: UserDetail,
				meta: [{
						name: "用户列表",
						path: "/userList"
					},{
						name: "用户详情",
						path: "/userDetail"
					}
				]
			}, {
				path: "/userUpdate",
				name: "UserUpdate",
				component: UserUpdate,
				meta: [{
						name: "用户列表",
						path: "/userList"
					},{
						name: "用户修改",
						path: "/userUpdate"
					}
				]
			}, {
				path: "/userAdd",
				name: "UserAdd",
				component: UserAdd,
				meta: [{
						name: "用户列表",
						path: "/userList"
					},{
						name: "新增用户",
						path: "/userAdd"
					}
				]
			}, {
				path: "/simpleDetailPage",
				name: "SimpleDetailPage",
				component: SimpleDetailPage,
				meta: [{
						name: "用户列表",
						path: "/userList"
					},{
						name: "用户详情",
						path: "/simpleDetailPage"
					}
				]
			},{
				path: "/menuList",
				name: "MenuList",
				component: MenuList,
				meta: [{
					name: "菜单列表",
					path: "/menuList"
				}]
			},{
				path: "/menuAdd",
				name: "MenuAdd",
				component: MenuAdd,
				meta: [{
						name: "菜单列表",
						path: "/menuList"
					},{
						name: "新增菜单",
						path: "/menuAdd"
					}
				]
			},{
				path: "/menuDetail",
				name: "MenuDetail",
				component: MenuDetail,
				meta: [{
						name: "菜单列表",
						path: "/menuList"
					},{
						name: "菜单详情",
						path: "/menuDetail"
					}
				]
			},{
				path: "/menuUpdate",
				name: "MenuUpdate",
				component: MenuUpdate,
				meta: [{
						name: "菜单列表",
						path: "/menuList"
					},{
						name: "菜单维护",
						path: "/menuUpdate"
					}
				]
			},{
				path: "/menuAuthList",
				name: "MenuAuthList",
				component: MenuAuthList,
				meta: [{
						name: "数据操作列表",
						path: "/menuAuthList"
					}
				]
			},{
				path: "/dopAdd",
				name: "DopAdd",
				component: DopAdd,
				meta: [{
						name: "数据操作列表",
						path: "/menuAuthList"
					},{
						name: "新增操作",
						path: "/dopAdd"
					}
				]
			},{
				path: "/dopUpdate",
				name: "DopUpdate",
				component: DopUpdate,
				meta: [{
						name: "数据操作列表",
						path: "/menuAuthList"
					},{
						name: "维护操作",
						path: "/dopUpdate"
					}
				]
			},{
				path: "/dopDetail",
				name: "DopDetail",
				component: DopDetail,
				meta: [{
						name: "数据操作列表",
						path: "/menuAuthList"
					},{
						name: "操作详情",
						path: "/dopDetail"
					}
				]
			},{
				path: "/roleList",
				name: "RoleList",
				component: RoleList,
				meta: [{
						name: "角色列表",
						path: "/roleList"
					}
				]
			},{
				path: "/roleAdd",
				name: "RoleAdd",
				component: RoleAdd,
				meta: [{
						name: "角色列表",
						path: "/roleList"
					},{
						name: "角色添加",
						path: "/roleAdd"
					}
				]
			},{
				path: "/roleDetail",
				name: "RoleDetail",
				component: RoleDetail,
				meta: [{
						name: "角色列表",
						path: "/roleList"
					},{
						name: "角色详情",
						path: "/roleDetail"
					}
				]
			},{
				path: "/roleUpdate",
				name: "RoleUpdate",
				component: RoleUpdate,
				meta: [{
						name: "角色列表",
						path: "/roleList"
					},{
						name: "角色维护",
						path: "/roleUpdate"
					}
				]
			},{
				path: "/roleMenuList",
				name: "RoleMenuList",
				component: RoleMenuList,
				meta: [{
						name: "角色菜单关系列表",
						path: "/roleMenuList"
					}
				]
			},{
				path: "/userRoleList",
				name: "UserRoleList",
				component: UserRoleList,
				meta: [{
						name: "角色菜单关系列表",
						path: "/userRoleList"
					}
				]
			},{
				path: "/menuDataOperateShipList",
				name: "MenuDataOperateShipList",
				component: MenuDataOperateShipList,
				meta: [{
						name: "菜单与数据操作关系配置",
						path: "/menuDataOperateShipList"
					}
				]
			},{
				path: "/menuDataOperateShipDetail",
				name: "MenuDataOperateShipDetail",
				component: MenuDataOperateShipDetail,
				meta: [{
						name: "菜单与数据操作关系-菜单列表",
						path: "/menuDataOperateShipList"
					},{
						name: "菜单与数据操作关系配置",
						path: "/menuDataOperateShipDetail"
					}
				]
			},{
				path: "/menuDataOperateShipSetting",
				name: "MenuDataOperateShipSetting",
				component: MenuDataOperateShipSetting,
				meta: [{
						name: "菜单与数据操作关系-菜单列表",
						path: "/menuDataOperateShipList"
					},{
						name: "菜单与数据操作关系配置",
						path: "/menuDataOperateShipSetting"
					}
				]
			},{
				path: "/menuDataOperateShipSetting2",
				name: "MenuDataOperateShipSetting2",
				component: MenuDataOperateShipSetting2,
				meta: [{
						name: "菜单与数据操作关系配置",
						path: "/menuDataOperateShipSetting2"
					}
				]
			},{
				path: "/iconList",
				name: "IconList",
				component: IconList,
				meta: [{
						name: "图标列表",
						path: "/iconList"
					}
				]
			},{
				path: "/iconAdd",
				name: "IconAdd",
				component: IconAdd,
				meta: [{
						name: "图标列表",
						path: "/iconList"
					},{
						name: "新增图标",
						path: "/iconAdd"
					}
				]
			},{
				path: "/iconUpdate",
				name: "IconUpdate",
				component: IconUpdate,
				meta: [{
						name: "图标列表",
						path: "/iconList"
					},{
						name: "维护图标",
						path: "/iconUpdate"
					}
				]
			},{
				path: "/specificationGroupList",
				name: "SpecificationGroupList",
				component: SpecificationGroupList,
				meta: [{
						name: "产品规格分组列表",
						path: "/specificationGroupList"
					}
				]
			},{
				path: "/addSpecificationGroup",
				name: "AddSpecificationGroup",
				component: AddSpecificationGroup,
				meta: [{
						name: "产品规格分组列表",
						path: "/specificationGroupList"
					},{
						name: "添加产品规格分组",
						path: "/addSpecificationGroup"
					}
				]
			},{
				path: "/updateSpecificationGroup",
				name: "UpdateSpecificationGroup",
				component: UpdateSpecificationGroup,
				meta: [{
						name: "产品规格分组列表",
						path: "/specificationGroupList"
					},{
						name: "维护产品规格分组",
						path: "/updateSpecificationGroup"
					}
				]
			},{
				path: "/listSpecification",
				name: "ListSpecification",
				component: ListSpecification,
				meta: [{
						name: "产品规格列表",
						path: "/listSpecification"
					}
				]
			},{
				path: "/addSpecification",
				name: "AddSpecification",
				component: AddSpecification,
				meta: [{
						name: "产品规格列表",
						path: "/listSpecification"
					},{
						name: "新增产品规格",
						path: "/addSpecification"
					}
				],
				children:[
					{
						path: "/selectSpecificationGroup",
						name: "SelectSpecificationGroup",
						component: SelectSpecificationGroup,
					},
					{
						path: "/selectSpuType",
						name: "SelectSpuType",
						component: SelectSpuType,
					},
				]
			},{
				path: "/updateSpecification",
				name: "UpdateSpecification",
				component: UpdateSpecification,
				meta: [{
						name: "产品规格列表",
						path: "/listSpecification"
					},{
						name: "维护产品规格",
						path: "/updateSpecification"
					}
				],
				children:[
					{
						path: "/selectSpecificationGroup2",
						name: "SelectSpecificationGroup2",
						component: SelectSpecificationGroup2,
					},
					{
						path: "/selectSpuType2",
						name: "SelectSpuType2",
						component: SelectSpuType2,
					},
				]
			},{
				path: "/detailSpecification",
				name: "DetailSpecification",
				component: DetailSpecification,
				meta: [{
						name: "产品规格列表",
						path: "/listSpecification"
					},{
						name: "产品规格详情",
						path: "/detailSpecification"
					}
				]
			},{
				path: "/listSpuType",
				name: "ListSpuType",
				component: ListSpuType,
				meta: [{
						name: "货品类型列表查询",
						path: "/listSpuType"
					}
				]
			},{
				path: "/addSpuType",
				name: "AddSpuType",
				component: AddSpuType,
				meta: [{
						name: "货品类型列表查询",
						path: "/listSpuType"
					},{
						name: "添加货品类型",
						path: "/addSpuType"
					}
				]
			},{
				path: "/updateSpuType",
				name: "UpdateSpuType",
				component: UpdateSpuType,
				meta: [{
						name: "货品类型列表查询",
						path: "/listSpuType"
					},{
						name: "维护货品类型",
						path: "/updateSpuType"
					}
				]
			},{
				path: "/detailSpuType",
				name: "DetailSpuType",
				component: DetailSpuType,
				meta: [{
						name: "货品类型列表查询",
						path: "/listSpuType"
					},{
						name: "货品类型详情",
						path: "/detailSpuType"
					}
				]
			},{
				path: "/listProperty",
				name: "ListProperty",
				component: ListProperty,
				meta: [{
						name: "产品属性列表查询",
						path: "/listProperty"
					}
				]
			},{
				path: "/detailProperty",
				name: "DetailProperty",
				component: DetailProperty,
				meta: [{
						name: "产品属性列表查询",
						path: "/listProperty"
					},{
						name: "产品属性详情",
						path: "/detailProperty"
					}
				]
			},{
				path: "/addProperty",
				name: "AddProperty",
				component: AddProperty,
				meta: [{
						name: "产品属性列表查询",
						path: "/listProperty"
					},{
						name: "新增产品属性",
						path: "/addProperty"
					}
				],
				children:[
					{
						path: "/selectSpuTypeProperty",
						name: "SelectSpuTypeProperty",
						component: SelectSpuTypeProperty,
					},
				]
			},{
				path: "/updateProperty",
				name: "UpdateProperty",
				component: UpdateProperty,
				meta: [{
						name: "产品属性列表查询",
						path: "/listProperty"
					},{
						name: "维护产品属性",
						path: "/updateProperty"
					}
				],
				children:[
					{
						path: "/selectSpuTypeUpdateProperty",
						name: "SelectSpuTypeUpdateProperty",
						component: SelectSpuTypeUpdateProperty,
					},
				]
			},{
				path: "/listPropertyOption",
				name: "ListPropertyOption",
				component: ListPropertyOption,
				meta: [{
						name: "产品属性值列表查询",
						path: "/listPropertyOption"
					}
				]
			},{
				path: "/addPropertyOption",
				name: "AddPropertyOption",
				component: AddPropertyOption,
				meta: [{
						name: "产品属性列表查询",
						path: "/listPropertyOption"
					},{
						name: "新增产品属性值",
						path: "/addPropertyOption"
					}
				],
				children:[
					{
						path: "/addPOSelectProperty",
						name: "AddPOSelectProperty",
						component: AddPOSelectProperty,
					},
				]
			},{
				path: "/updatePropertyOption",
				name: "UpdatePropertyOption",
				component: UpdatePropertyOption,
				meta: [{
						name: "产品属性列表查询",
						path: "/listPropertyOption"
					},{
						name: "维护产品属性值",
						path: "/updatePropertyOption"
					}
				],
				children:[
					{
						path: "/updatePOSelectProperty",
						name: "UpdatePOSelectProperty",
						component: UpdatePOSelectProperty,
					},
				]
			},{
				path: "/detailPropertyOption",
				name: "DetailPropertyOption",
				component: DetailPropertyOption,
				meta: [{
						name: "产品属性列表查询",
						path: "/listPropertyOption"
					},{
						name: "产品属性值详情",
						path: "/detailPropertyOption"
					}
				]
			},{
				path: "/listSkuPropertyOption",
				name: "ListSkuPropertyOption",
				component: ListSkuPropertyOption,
				meta: [{
						name: "产品属性配置列表查询",
						path: "/listSkuPropertyOption"
					}
				]
			}
			// ,{
			// 	path: "/addSkuPropertyOption",
			// 	name: "AddSkuPropertyOption",
			// 	component: AddSkuPropertyOption,
			// 	meta: [{
			// 			name: "产品属性配置列表查询",
			// 			path: "/listSkuPropertyOption"
			// 		},{
			// 			name: "产品属性配置",
			// 			path: "/addSkuPropertyOption"
			// 		}
			// 	]
			// }
			,{
				path: "/updateSkuPropertyOption",
				name: "UpdateSkuPropertyOption",
				component: UpdateSkuPropertyOption,
				meta: [{
						name: "产品属性配置列表查询",
						path: "/listSkuPropertyOption"
					},{
						name: "产品属性配置",
						path: "/updateSkuPropertyOption"
					}
				],
				children:[
					{
						path: "/updateSelectPropertyOption",
						name: "UpdateSelectPropertyOption",
						component: UpdateSelectPropertyOption,
					},
				]
			},{
				path: "/detailSkuPropertyOption",
				name: "DetailSkuPropertyOption",
				component: DetailSkuPropertyOption,
				meta: [{
						name: "产品属性配置列表查询",
						path: "/listSkuPropertyOption"
					},{
						name: "产品属性详情",
						path: "/detailSkuPropertyOption"
					}
				]
			},{
				path: "/listSkuSpecificationOption",
				name: "ListSkuSpecificationOption",
				component: ListSkuSpecificationOption,
				meta: [{
						name: "产品规格选项管理",
						path: "/listSkuSpecificationOption"
					}
				]
			},{
				path: "/listSpuBrand",
				name: "ListSpuBrand",
				component: ListSpuBrand,
				meta: [{
						name: "SPU产品品牌管理",
						path: "/listSpuBrand"
					}
				]
			},{
				path: "/detailSpuBrand",
				name: "DetailSpuBrand",
				component: DetailSpuBrand,
				meta: [{
						name: "SPU产品品牌管理",
						path: "/listSpuBrand"
					},{
						name: "SPU产品品牌详情",
						path: "/detailSpuBrand"
					}
				]
			},{
				path: "/addSpuBrand",
				name: "AddSpuBrand",
				component: AddSpuBrand,
				meta: [{
						name: "SPU产品品牌管理",
						path: "/listSpuBrand"
					},{
						name: "添加SPU产品品牌",
						path: "/addSpuBrand"
					}
				]
			},{
				path: "/updateSpuBrand",
				name: "UpdateSpuBrand",
				component: UpdateSpuBrand,
				meta: [{
						name: "SPU产品品牌管理",
						path: "/listSpuBrand"
					},{
						name: "添加SPU产品品牌",
						path: "/updateSpuBrand"
					}
				]
			}]//在这里加 
		}, {
			path: "/",
			name: "Login",
			component: Login,
			meta: {
				title: "登录"
			}
		}, {
			path: "/register",
			name: "register",
			component: UserAdd,
			meta: [{
					name: "登录",
					path: "/"
				}, {
					name: "用户注册",
					path: "/register"
				}

			]
		}, {
			path: "/passwordReset",
			name: "passwordReset",
			component: PasswordReset,
			meta: [{
					name: "登录",
					path: "/"
				}, {
					name: "密码重置",
					path: "/passwordReset"
				}

			]
		},

	]
})
