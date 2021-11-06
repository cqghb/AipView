<template>
	<!-- 用户角色关系管理页面 -->
	<div>
		<two-tree-setting ref="userRoleSetting"
							leftTreeTheme="用户树" 
							rightTreeTheme="角色树"
							editEnableLabel="编辑用户角色权限"
							:operationButtonList="operationButtonList"
							:leftTreeDataList="userDataList"
							:rightTreeDataList="roleDataList"
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
		name: "UserRoleList",
		components: {
			"two-tree-setting": TwoTreeSetting,
		},
		data() {
			return {
				operationButtonList: [
					{
						type: ComponentConstant.ButtonTypeProperties.WARNING,
						icon: "el-icon-edit",
						text: "用户角色权限更新",
						handle:()=>{
							let _this = this;
							_this.userRoleRelationSetting();
						}
					}
				],
				userDataList: [],
				roleDataList: [],
				userId: "",
			};
		},
		methods:{
			getUserDataList(){// 获取右边树数据
				let the = this;
				CommInterface.baseSendGet(
				    SystemConstant.consUserManage.QUERY_ALL,
				    null,
				    function (res) {
				        the.userDataList = res;
				    }
				);
			},
			getRoleDataList(){// 获取左边树数据
				let the = this;
				CommInterface.baseSendGet(
				    SystemConstant.consRoleManage.QUERY_ALL,
				    null,
				    function (res) {
				        the.roleDataList = res;
				    }
				);
			},
			roleTreeNodeClick(data, nodeObj, nodeComp){// 选中左边树节点事件，因为只有一层，所以直接处理
				let _this = this;
				_this.userId = data.id;
				_this.queryUserRole();
			},
			userRoleRelationSetting(){// 角色菜单关系设置
				let _this = this;
				if(_this.userId == ""){
					util.showMsg("请选择左侧用户", ComponentConstant.MessageProperties.ERROR);
					return ;
				}
				let checkedNodeArr = _this.$refs.userRoleSetting.$refs.rightTree.getCheckedNodes();
				let checkedIdList = [];
				for(let i=0; i<checkedNodeArr.length; i++){
					// 这里没有分组，直接获取拿到的角色ID
					checkedIdList.push(checkedNodeArr[i].id);
				}
				// 拿出角色ID
				let params = {
					userId: _this.userId,
					roleIdList: checkedIdList
				};
				CommInterface.sendPost(
				    SystemConstant.consRoleMenuRelationManage.UPDATE,
				    params,
				    function (res) {
				        if(res>0){
				            util.showMsg(MsgConstant.msgCommon.SUCCESS_UPDATE, ComponentConstant.MessageProperties.SUCCESS);
				        } else {
				            util.showMsg(MsgConstant.msgCommon.FAIL_UPDATE, ComponentConstant.MessageProperties.ERROR);
				        }
				    }
				);
			},
			queryUserRole(){
				let _this = this;
				CommInterface.sendPost(
				    SystemConstant.consUserRoleRelationManage.QUERY_RELATION_BY_USER_ID,
				    {id: _this.userId},
				    function (res) {
				        let oldRelationList = [];// 原来的数据操作权限
						for(let i=0; i<res.length; i++){
							oldRelationList.push(res[i].menuId);
						}
						_this.$refs.userRoleSetting.$refs.rightTree.setCheckedKeys(oldRelationList);
				
				    }
				);
				
			}
		},
		created() {
			
		},
		mounted() {
			let _this = this;
			_this.getUserDataList();
			_this.getRoleDataList();
		}
	}
</script>

<style>
</style>
