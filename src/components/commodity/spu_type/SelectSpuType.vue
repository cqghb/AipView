<template>
	<div>
		<!-- 货品类型选择页面 -->
		<base-table :uri="uri"
		            ref="selectSpuTypeTable"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					:crumbs="false"
					:multiSelect="false"
					searchFormRef="searchSelectSpuTypeForm"
		            :searchHandle="searchHandle"></base-table>
	</div>
</template>

<script>
	import BaseTable from "@/components/common/BaseTable";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as businessConstant from '@/components/constant/businessConstant';
	
	export default{
		name: "SelectSpuType",
		components:{
			"base-table": BaseTable,
		},
		data() {
			return {
				uri: SystemConstant.consSpuTypeManage.FIND_PAGE,
				searchData:{
					name: "",// 节点名称
					// delTag: BusinessConstant.NO,// 删除标记
				},
				searchForm:{
					name: {
						type: "Input",
						label: "货品类型名称",
						prop: "name",
						width: "180px",
						placeholder: "请输入货品类型名称...",
						size:""
					},
					// delTag: {
					// 	type: "Select",
					// 	label: "删除标志",
					// 	prop: "delTag",
					// 	width: "180px",
					// 	options: [],
					// 	change: function(v){
					// 		console.log("当前值",v);
					// 	}
					// }
					
				},
				searchHandle:[
					{
						label:"查询",
						type:"primary",
						size: "",
						handle:()=>{
							let the = this;
							the.loading = true;
							the.$refs.selectSpuTypeTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let the = this;
							the.$refs.selectSpuTypeTable.$refs.searchSelectSpuTypeForm.$refs.defaultMyForm.resetFields();
						}
					}
				],
				formSize: "",
				operationButtonList:[
					{
						type: "primary",
						icon: "el-icon-plus",
						text: "确定",
						handle:()=>{
							let the = this;
							the.thisData();
						}
					}
				],
				tableColumnList:[
					{ prop: "id", label: "ID", width: 180 },
					{ prop: "name", label: "货品类型名称", width: 180 },
					{ prop: "remark", label: "备注"},
				],
				selectedData: false
			};
		},
		methods:{
			thisData(){
				let _this = this;
				let currentRow = _this.$refs.selectSpuTypeTable.currentRow;
				if(currentRow){
					// 父组件 没有这个方法会报错
					_this.$emit(businessConstant.CALLBACK_FUNCTION_NAME.SET_SPU_TYPE, currentRow.id, currentRow.name);
				}
			},
			
		},
		created() {
			
		},
		mounted() {
			let _this = this;
		}
	}
</script>

<style>
</style>
