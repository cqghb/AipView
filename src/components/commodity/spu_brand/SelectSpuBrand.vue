<template>
	<div>
		<!-- 货品品牌选择页面 -->
		<base-table :uri="uri"
		            ref="tableSpuBrand"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					:crumbs="false"
					:multiSelect="false"
					searchFormRef="searchSpuBrandForm"
		            :searchHandle="searchHandle"></base-table>
	</div>
</template>

<script>
	import BaseTable from "@/components/common/BaseTable";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as CommInterface from '@/components/utils/commInterface';
	import * as businessConstant from '@/components/constant/businessConstant';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	
	import util from "@/components/utils/util";
	
	
	export default {
		name: "SelectSpuBrand",
		components: {
			"base-table": BaseTable,
		},
		data() {
			return {
				uri: SystemConstant.consSpuBrandManage.FIND_PAGE,
				searchData:{
					name: "",// 节点名称
					// delTag: businessConstant.NO,// 删除标记
				},
				searchForm:{
					name: {
						type: "Input",
						label: "品牌名称",
						prop: "name",
						width: "180px",
						placeholder: "请输入规格名称...",
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
							let _this = this;
							_this.loading = true;
							_this.$refs.tableSpuBrand.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let _this = this;
							_this.$refs.tableSpuBrand.$refs.searchSpuBrandForm.$refs.defaultMyForm.resetFields();
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
					{ prop: "id", label: "品牌ID", width: 180 },
					// { prop: "code", label: "品牌编码", width: 180 },
					{ prop: "name", label: "品牌名称", width: 180 },
					// { prop: "delTag", label: "删除标记", width: 80 },
					{ prop: "remark", label: "备注"},
				],
				selectedData: false
			};
		},
		methods: {
			// searchDelTagOptions(data){
			// 	let _this = this;
			// 	_this.searchForm.delTag.options = data;
			// },
			thisData(){
				let _this = this;
				let currentRow = _this.$refs.tableSpuBrand.currentRow;
				if(currentRow){
					// 父组件 没有这个方法会报错
					_this.$emit(businessConstant.CALLBACK_FUNCTION_NAME.SET_SPU_BRAND, currentRow.id, currentRow.name);
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
