<template>
	<!-- 角色菜单关系管理页面 -->
	<div>
		<two-tree-setting ref="roleMenuSetting"
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
	import util from "@/components/utils/util";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	import * as CommInterface from '@/components/utils/commInterface';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as BusinessConstant from '@/components/constant/businessConstant';
	
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
							_this.roleMenuRelationSetting();
						}
					}
				],
				roleDataList: [],
				menuDataList: [],
				roleId: "",
			};
		},
		methods:{
			getRoleDataList(){// 获取左边树数据
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
			getMenuDataList(){// 获取右边树数据
				let the = this;
				CommInterface.baseSendGet(
				    SystemConstant.consMenuManage.QUERY_MENU,
				    null,
				    function (res) {
				        the.menuDataList = res.rootTree;
				    }
				);
			},
			roleTreeNodeClick(data, nodeObj, nodeComp){// 选中左边树节点事件，因为只有一层，所以直接处理
				console.log('a', data);
				console.log('b', nodeObj);
				console.log('c', nodeComp);
				let _this = this;
				_this.roleId = data.id;
				_this.queryRoleMenu();
			},
			roleMenuRelationSetting(){// 角色菜单关系设置
				let the = this;
				if(the.roleId == ""){
					util.showMsg("请选择左侧角色", ComponentConstant.MessageProperties.ERROR);
					return ;
				}
				let checkedNodeArr = the.$refs.roleMenuSetting.$refs.rightTree.getCheckedNodes();
				let checkedIdList = [];
				for(let i=0; i<checkedNodeArr.length; i++){
					// 根全部不要
					if(BusinessConstant.NO == checkedNodeArr[i].childrenFlag){
						continue;
					} else {
						checkedIdList.push(checkedNodeArr[i].id);
					}
					
				}
				// 拿出操作ID
				let params = {
					roleId: the.roleId,
					menuIdList: checkedIdList
				};
				console.log('params', params);
				CommInterface.sendPost(
				    SystemConstant.consRoleMenuRelationManage.UPDATE,
				    params,
				    function (res) {
				        console.log("修改结果 ",res);
				        if(res>0){
				            util.showMsg(MsgConstant.msgCommon.SUCCESS_UPDATE, ComponentConstant.MessageProperties.SUCCESS);
				        } else {
				            util.showMsg(MsgConstant.msgCommon.FAIL_UPDATE, ComponentConstant.MessageProperties.ERROR);
				        }
				    }
				);
			},
			queryRoleMenu(){
				let _this = this;
				CommInterface.baseSendGet(
				    SystemConstant.consRoleMenuRelationManage.QUERY_RELATION_BY_ROLE_ID,
				    {roleId: _this.roleId},
				    function (res) {
						console.log("查询结果 ",res);
				        let oldRelationList = [];// 原来的数据操作权限
						for(let i=0; i<res.length; i++){
							oldRelationList.push(res[i].menuId);
						}
						_this.$refs.roleMenuSetting.$refs.rightTree.setCheckedKeys(oldRelationList);
				
				    }
				);
				
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
