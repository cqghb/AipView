<template>
	<!-- 菜单管理列表 -->
	<div>
		<base-table uri="/queryMenuList"
		            ref="menuTable"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					searchFormRef="searchMenuForm"
		            :searchHandle="searchHandle"></base-table>
	</div>
</template>

<script>
	import BaseTable from "@/components/common/BaseTable";
	import * as SystemConstant from '@/components/constant/systemConstant';
	
	export default {
		name: "MenuList",
		components: {
			"base-table": BaseTable,
		},
		data() {
			return {
				searchData:{
					id: "",// 主键
					name: "",// 节点名称
					parentNode: ""// 父节点ID
				},
				searchForm:{
					id: {
						type: "Input",
						label: "ID",
						prop: "id",
						width: "180px",
						placeholder: "请输入ID...",
						size:""
					},
					name: {
						type: "Input",
						label: "菜单名称",
						prop: "name",
						width: "180px",
						placeholder: "请输入菜单名称...",
						size:""
					},
					parentNode: {
						type: "Input",
						label: "菜单父节点ID",
						prop: "parentNode",
						width: "180px",
						placeholder: "请输入菜单父节点ID...",
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
							the.$refs.menuTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let the = this;
							the.searchData.id= "";
							the.searchData.name= "";
							the.searchData.parentNode= "";
						}
					}
				],
				formSize: "",
				operationButtonList:[
					{
						type: "",
						icon: "el-icon-more",
						text: "详情",
						handle:()=>{
							let the = this;
							the.showUserInfo();
						}
					},
					{
						type: "primary",
						icon: "el-icon-plus",
						text: "新增",
						handle:()=>{
							let the = this;
							the.addUser();
						}
					},
					{
						type: "warning",
						icon: "el-icon-edit",
						text: "修改",
						handle:()=>{
							let the = this;
							the.updateWinShow();
						}
					},
					{
						type: "danger",
						icon: "el-icon-delet",
						text: "删除",
						handle:()=>{
							let the = this;
							util.confirm("", "", "", "", "",function () {// 确认
								the.deleteUser();
							},null);
			
						}
					},
				],
				tableColumnList:[
					{ prop: "id", label: "ID", width: 180 },
					{ prop: "name", label: "姓名", width: 180 },
					{ prop: "icon", label: "父节点ID", width: 180 },
					{ prop: "parentNode", label: "菜单图标", width: 180 },
					{ prop: "defaultSelect", label: "是否默认选中", width: 180 },
					{ prop: "uri", label: "请求地址", width: 180 },
					{ prop: "createUser", label: "创建人", width: 180 },
					// { prop: "createTime", label: "创建时间", width: 180, type:"Date" },
					{ prop: "createTime", label: "创建时间", width: 180, type:SystemConstant.dataType.DATE, formatDate: SystemConstant.common.FORMAT_DATE },
					{ prop: "updateUser", label: "修改人", width: 180 },
					{ prop: "updateTime", label: "修改时间", width: 180, type:SystemConstant.dataType.DATE, formatDate:SystemConstant.common.FORMAT_DATE }
				],
				selectedData: false
			}
			
		},
		methods:{
			
		},
		mounted() {
			
		}
	}
</script>

<style>
</style>
