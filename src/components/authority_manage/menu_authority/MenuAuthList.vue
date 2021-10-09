<template>
	<!-- 菜单数据操作权限管理页面 -->
	<div>
		<base-table :uri="uri"
		            ref="dopTable"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					searchFormRef="searchDopForm"
		            :searchHandle="searchHandle"></base-table>
	</div>
</template>

<script>
	import BaseTable from "@/components/common/BaseTable";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as CommInterface from '@/components/utils/commInterface';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	
	export default {
		name: "MenuAuthList",
		components: {
			"base-table": BaseTable,
		},
		data() {
			return {
				uri: SystemConstant.consDopManage.FIND_PAGE,
				searchData:{
					name: "",// 操作名称
				},
				searchForm:{
					name: {
						type: "Input",
						label: "操作名称",
						prop: "name",
						width: "180px",
						placeholder: "请输入操作名称...",
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
							the.$refs.dopTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let the = this;
							// TODO 待完成
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
							// the.addRole();
						}
					},
					{
						type: "warning",
						icon: "el-icon-edit",
						text: "修改",
						handle:()=>{
							let the = this;
							// the.updateRole();
						}
					},
					{
						type: "danger",
						icon: "el-icon-delet",
						text: "删除",
						handle:()=>{
							let the = this;
							util.confirm("", "", "", "", "",function () {// 确认
								// the.deleteRole();
							}, null);
							
						}
					},
				],
				tableColumnList:[
					// { prop: "id", label: "ID", width: 180 },
					{ prop: "name", label: "角色名称", width: 180 },
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
			
		},
		created() {
			
		},
		mounted() {
			
		}
	}
</script>

<style>
</style>
