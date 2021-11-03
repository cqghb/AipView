<template>
	<!-- 
	菜单配置数据操作权限 
	-->
	<div>
		<two-tree-setting ref="menuOperSetting"
							leftTreeTheme="菜单树" 
							rightTreeTheme="数据操作权限树"
							editEnableLabel="菜单操作数据权限更新"
							:operationButtonList="operationButtonList"
							:leftTreeDataList="menuDataList"
							:rightTreeDataList="dataOperateList"
							leftTreeCurrentCheckKey=""
							:rightTreeDefaultCheckedList="dataOperateListDefaultCheck"
							@leftTreeNodeClick="menuTreeNodeClick"
							:rightTreeNodeClickEvent="()=>{}"
							></two-tree-setting>
		
	</div>
	
	
</template>

<script>
	import TwoTreeSetting from "@/components/common/TwoTreeSetting";
	import util from "@/components/utils/util";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as CommInterface from '@/components/utils/commInterface';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as BusinessConstant from '@/components/constant/businessConstant';
	
	export default {
		name: "MenuDataOperateShipSetting2",
		components: {
			"two-tree-setting": TwoTreeSetting,
		},
		data() {
			return {
				operationButtonList: [
					{
						type: ComponentConstant.ButtonTypeProperties.WARNING,
						icon: "el-icon-edit",
						text: "更新数据操作权限",
						handle:()=>{
							let _this = this;
							_this.menuDataOperateShipSetting();
						}
					}
				],
				menuDataList:[],// 左侧菜单数据
				dataOperateList:[],// 右侧操作权限数据
				dataOperateListDefaultCheck:[],
				menuId: "",			
			};
		},
		computed: {
		},
		methods: {
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
			getDataOperateList(){
				let the = this;
				CommInterface.sendPost(
				    SystemConstant.consCodeManage.FIND_PAGE_CHILDREN2,
				    null,
				    function (res) {
				        the.dataOperateList = res;
				    }
				);
			},
			menuDataOperateShipSetting(){
				let the = this;
				if(the.menuId == ""){
					util.showMsg("请选择左侧菜单", ComponentConstant.MessageProperties.ERROR);
					return ;
				}
				let checkedNodeArr = the.$refs.menuOperSetting.$refs.rightTree.getCheckedNodes();
				let checkedIdList = [];
				for(let i=0; i<checkedNodeArr.length; i++){
					// 根全部不要
					if(checkedNodeArr[i].childrenList){
						continue;
					}
					checkedIdList.push(checkedNodeArr[i].id);
				}
				// 拿出操作ID
				let params = {
					menuId: the.menuId,
					dataOperateList: checkedIdList
				};
				console.log('params', params);
				CommInterface.sendPost(
				    SystemConstant.consMenuDataOperateRelationManage.UPDATE,
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
			queryMenuDataOperation(){
				// 查询原来的数据操作权限
				let the = this;
				let params = {
					id: the.menuId
				};
				CommInterface.sendPost(
				    SystemConstant.consMenuDataOperateRelationManage.QUERY_BY_MENU_ID,
				    params,
				    function (res) {
						console.log("查询结果 ",res);
						let oldDataOperationList = [];// 原来的数据操作权限
						for(let i=0; i<res.length; i++){
							oldDataOperationList.push(res[i].id);
						}
						the.$refs.menuOperSetting.$refs.rightTree.setCheckedKeys(oldDataOperationList);
				    }
				);
			},
			menuTreeNodeClick(data, nodeObj, nodeComp){
				console.log('a', data);
				console.log('b', nodeObj);
				console.log('c', nodeComp);
				let _this = this;
				_this.menuId = data.id;
				let childrenFlag = data.childrenFlag;
				// 点击根菜单才去查相关菜单权限
				if(BusinessConstant.YES==childrenFlag){
					_this.queryMenuDataOperation();
				} else {
					// 清空权限
					_this.$refs.menuOperSetting.$refs.rightTree.setCheckedKeys([]);
				}
			},
		},
		created() {
			
		},
		mounted() {
			let the = this;
			the.getMenuDataList();
			the.getDataOperateList();
			
		}
	}
</script>

<style>
	.custom-tree-container {
	    display: flex;
	    margin: -24px;
	}
	.block {
	    flex: 1;
	    padding: 8px 24px 24px;
	}
	.demo-block {
	    margin-bottom: 24px;
		
		border: 1px solid #ebebeb;
		border-radius: 3px;
		transition: .2s;
	}
	.demo-block .source {
	    padding: 24px;
	}
	
	.demo-tree .block:first-child {
	    border-right: 1px solid #eff2f6;
	}
</style>
