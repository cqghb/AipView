<template>
	<div>
		<!-- 商品规格组管理 -->
		<base-table :uri="uri"
		            ref="specificationGroupTable"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					searchFormRef="searchSpecificationGroupForm"
		            :searchHandle="searchHandle"></base-table>
	</div>
</template>

<script>
	import BaseTable from "@/components/common/BaseTable";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	
	
	export default{
		name: "SpecificationGroupList",
		components:{
			"base-table": BaseTable,
		},
		data() {
			return {
				uri: SystemConstant.consSpecificationGroupManage.FIND_PAGE,
				searchData:{
					name: "",// 节点名称
				},
				searchForm:{
					name: {
						type: "Input",
						label: "规格组名称",
						prop: "name",
						width: "180px",
						placeholder: "请输入规格组名称...",
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
							the.$refs.specificationGroupTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let the = this;
							the.$refs.specificationGroupTable.$refs.searchSpecificationGroupForm.$refs.defaultMyForm.resetFields();
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
							the.addRole();
						}
					},
					{
						type: "warning",
						icon: "el-icon-edit",
						text: "修改",
						handle:()=>{
							let the = this;
							the.updateRole();
						}
					},
					{
						type: "danger",
						icon: "el-icon-delet",
						text: "删除",
						handle:()=>{
							let the = this;
							util.confirm("", "", "", "", "",function () {// 确认
								the.deleteRole();
							}, null);
							
						}
					},
				],
				tableColumnList:[
					// { prop: "id", label: "ID", width: 180 },
					{ prop: "name", label: "规格组名称", width: 180 },
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
