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
import AddSpecificationGroup from '@/components/commodity/specification_group/AddSpecificationGroup'
import UpdateSpecificationGroup from '@/components/commodity/specification_group/UpdateSpecificationGroup'
import ListSpecification from '@/components/commodity/specification/ListSpecification'
import AddSpecification from '@/components/commodity/specification/AddSpecification'
import UpdateSpecification from '@/components/commodity/specification/UpdateSpecification'
import DetailSpecification from '@/components/commodity/specification/DetailSpecification'




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
			}]//在这里加 ListSpecification
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
