<template>
	<!-- 图标管理 -->
	<div>
		<base-table :uri="uri"
		            ref="iconManaTable"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					searchFormRef="searchRoleForm"
		            :searchHandle="searchHandle"></base-table>
	</div>
</template>

<script>
	import BaseTable from "@/components/common/BaseTable";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as CommInterface from '@/components/utils/commInterface';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	
	import util from "@/components/utils/util";
	
	export default {
		name: "IconList",
		components: {
			"base-table": BaseTable,
		},
		data() {
			return {
				uri: SystemConstant.consIconManage.FIND_PAGE,
				searchData:{
					name: "",// 节点名称
				},
				searchForm:{
					name: {
						type: "Input",
						label: "图标名称",
						prop: "name",
						width: "180px",
						placeholder: "请输入图标名称...",
						size:""
					}
					
				},
				searchHandle:[
					{
						label:"查询",
						type:"primary",
						size: "",
						handle:()=>{
							let the = this;
							the.loading = true;
							the.$refs.iconManaTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let the = this;
							the.$refs.iconManaTable.$refs.searchRoleForm.$refs.defaultMyForm.resetFields();
						}
					}
				],
				formSize: "",
				operationButtonList:[
					// {
					// 	type: "",
					// 	icon: "el-icon-more",
					// 	text: "详情",
					// 	handle:()=>{
					// 		let the = this;
					// 		the.showDetail();
					// 	}
					// },// 太简单不用详情页面了
					{
						type: "primary",
						icon: "el-icon-plus",
						text: "新增",
						handle:()=>{
							let the = this;
							the.addIcon();
						}
					},
					{
						type: "warning",
						icon: "el-icon-edit",
						text: "修改",
						handle:()=>{
							let the = this;
							the.updateIcon();
						}
					},
					{
						type: "danger",
						icon: "el-icon-delet",
						text: "删除",
						handle:()=>{
							let the = this;
							util.confirm("", "", "", "", "",function () {// 确认
								the.deleteIcon();
							}, null);
							
						}
					},
				],
				tableColumnList:[
					{ prop: "id", label: "ID", width: 180 },
					{ prop: "name", label: "图标名称", width: 180 },
					{ prop: "englishName", label: "图标英文名称", width: 180 },
					{ prop: "index", label: "排列顺序"},
					{ prop: "remark", label: "备注"},
					{ prop: "createUser", label: "创建人", width: 180 },
					{ prop: "createTime", label: "创建时间", width: 180, type:SystemConstant.dataType.DATE, formatDate: SystemConstant.common.FORMAT_DATE },
					{ prop: "updateUser", label: "修改人", width: 180 },
					{ prop: "updateTime", label: "修改时间", width: 180, type:SystemConstant.dataType.DATE, formatDate:SystemConstant.common.FORMAT_DATE }
				],
				selectedData: false
			};
		},
		methods:{
			addIcon(){// 添加
				CommInterface.goToPage(SystemConstant.consComponentPath.ADD_ICON, SystemConstant.consComponentName.ADD_ICON, {});
			},
			updateIcon(){// 修改
				let the = this;
				the.$refs.iconManaTable.commonCheck();
				if(the.$refs.iconManaTable.selectedData){
					let params = the.$refs.iconManaTable.selectedDataArr[0];
					let param = {
					        id: params.id
					    };
					CommInterface.goToPage(SystemConstant.consComponentPath.UPDATE_ICON, SystemConstant.consComponentName.UPDATE_ICON, param);
				}
			},
			deleteIcon(){// 删除
				let the = this;
				the.$refs.iconManaTable.commonCheck();
				if(the.$refs.iconManaTable.selectedData){
					let selectedItem = the.$refs.iconManaTable.selectedDataArr[0];
					let id = selectedItem.id;
					CommInterface.sendPost(SystemConstant.consIconManage.UPDATE_DEL_TAG, {id: id}, function(num){
						if(num>0){
							util.showMsg(MsgConstant.msgCommon.SUCCESS_DELETE, ComponentConstant.MessageProperties.SUCCESS);
							the.$refs.iconManaTable.loading = true;
							the.$refs.iconManaTable.queryList();
						} else {
							util.showMsg(MsgConstant.msgCommon.FALL_DELETE, ComponentConstant.MessageProperties.ERROR);
						}
					});
				}
			}
		},
		created() {
			
		},
		mounted() {
			
		}
	}
</script>

<style>
</style>
