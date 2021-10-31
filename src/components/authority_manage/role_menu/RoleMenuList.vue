<template>
	<!-- 角色菜单关系管理页面 -->
	<div>
		<two-tree-setting ref="menuOperSetting"
							leftTreeTheme="角色树" 
							rightTreeTheme="菜单树"
							editEnableLabel="编辑角色菜单权限"
							:operationButtonList="operationButtonList"
							:leftTreeDataList="roleDataList"
							:rightTreeDataList="menuDataList"
							@leftTreeNodeClick="roleTreeNodeClick"
							></two-tree-setting>
	</div>
</template>

<script>
	import TwoTreeSetting from "@/components/common/TwoTreeSetting";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	import * as CommInterface from '@/components/utils/commInterface';
	
	export default {
		name: "RoleMenuList",
		components: {
			"two-tree-setting": TwoTreeSetting,
		},
		data() {
			return {
				operationButtonList: [
					{
						type: ComponentConstant.ButtonTypeProperties.WARNING,
						icon: "el-icon-edit",
						text: "角色菜案权限更新",
						handle:()=>{
							let _this = this;
							// _this.menuDataOperateShipSetting();
						}
					}
				],
				roleDataList: [],
				menuDataList: [],
				roleId: "",
			};
		},
		methods:{
			getRoleDataList(){
				let the = this;
				CommInterface.baseSendGet(
				    SystemConstant.consRoleManage.QUERY_ALL,
				    null,
				    function (res) {
						console.log('角色树数据', res);
				        the.roleDataList = res;
				    }
				);
			},
			getMenuDataList(){
				let the = this;
				CommInterface.baseSendGet(
				    SystemConstant.consMenuManage.QUERY_MENU,
				    null,
				    function (res) {
				        the.menuDataList = res.rootTree;
				    }
				);
			},
			roleTreeNodeClick(data, nodeObj, nodeComp){
				console.log('a', data);
				console.log('b', nodeObj);
				console.log('c', nodeComp);
				let _this = this;
			}
		},
		created() {
			
		},
		mounted() {
			let _this = this;
			_this.getRoleDataList();
			_this.getMenuDataList();
		}
	}
</script>

<style>
</style>
