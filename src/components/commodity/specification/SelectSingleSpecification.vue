<template>
	<div>
		<!-- 选择产品规格 -->
		<base-table :uri="uri"
		            ref="selectSingleSpecificationTable"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					:multiSelect="false"
					:crumbs="false"
					searchFormRef="searchSelectSingleSpecificationForm"
		            :searchHandle="searchHandle" 
					@searchDelTagOptions="searchDelTagOptions"></base-table>
	</div>
</template>

<script>
	import BaseTable from "@/components/common/BaseTable";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as businessConstant from '@/components/constant/businessConstant';
	
	export default {
		name: "SelectSingleSpecification",
		components: {
			"base-table": BaseTable,
		},
		data() {
			return {
				uri: SystemConstant.consSpecificationManage.FIND_PAGE,
				searchData:{
					name: "",// 节点名称
					delTag: businessConstant.NO,// 删除标记
				},
				searchForm:{
					name: {
						type: "Input",
						label: "规格名称",
						prop: "name",
						width: "180px",
						placeholder: "请输入规格名称...",
						size:""
					},
					
				},
				searchHandle:[
					{
						label:"查询",
						type:"primary",
						size: "",
						handle:()=>{
							let _this = this;
							_this.loading = true;
							_this.$refs.selectSingleSpecificationTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let _this = this;
							_this.$refs.selectSingleSpecificationTable.$refs.searchSelectSingleSpecificationForm.$refs.defaultMyForm.resetFields();
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
							let _this = this;
							_this.ok();
						}
					},
					
				],
				tableColumnList:[
					// { prop: "id", label: "ID", width: 180 },
					{ prop: "name", label: "规格名称", width: 180 },
					// { prop: "groupId", label: "SKU产品规格组ID", width: 180 },
					{ prop: "groupIdName", label: "SKU产品规格组名称", width: 180 },
					// { prop: "typeId", label: "SPU商品分类ID", width: 180 },
					{ prop: "typeIdName", label: "SPU商品分类名称", width: 180 },
				],
				selectedData: false
			};
		},
		methods: {
			searchDelTagOptions(data){
				// let _this = this;
				// _this.searchForm.delTag.options = data;
			},
			ok(){/* 确定 */
				let _this = this;
				let currentRow = _this.$refs.selectSingleSpecificationTable.currentRow;
				if(currentRow){
					_this.$emit(businessConstant.CALLBACK_FUNCTION_NAME.SET_SINGLE_SPECIFICATION, currentRow.id, currentRow.name);
				}
			},
			
			
		},
		created() {
			let _this = this;
		},
		mounted() {
			let _this = this;
		}
	}
</script>

<style scoped="scoped">
</style>
