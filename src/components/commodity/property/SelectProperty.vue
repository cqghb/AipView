<template>
	<div>
		<!-- 选中货品属性 -->
		<base-table :uri="uri"
		            ref="selectPropertyTable"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					:crumbs="false"
					:multiSelect="false"
					searchFormRef="searchPropertyForm"
		            :searchHandle="searchHandle"></base-table>
	</div>
</template>

<script>
	import BaseTable from "@/components/common/BaseTable";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as BusinessConstant from '@/components/constant/businessConstant';
	
	import util from "@/components/utils/util";
	
	
	export default {
		name: "SelectProperty",
		components: {
			"base-table": BaseTable,
		},
		data() {
			return {
				uri: SystemConstant.consPropertyManage.FIND_PAGE,
				searchData:{
					name: "",// 属性名称
				},
				searchForm:{
					name: {
						type: "Input",
						label: "属性名称",
						prop: "name",
						width: "180px",
						placeholder: "请输入属性名称...",
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
							_this.$refs.selectPropertyTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let _this = this;
							_this.$refs.selectPropertyTable.$refs.searchPropertyForm.$refs.defaultMyForm.resetFields();
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
					{ prop: "id", label: "ID", width: 100 },
					{ prop: "name", label: "产品属性名称", width: 180 },
					{ prop: "typeId", label: "分类ID", width: 80 },
					// { prop: "delTag", label: "删除标记", width: 80 },
					{ prop: "remark", label: "备注"},
					// { prop: "createUser", label: "创建人", width: 120 },
					// { prop: "createTime", label: "创建时间", width: 160, type:SystemConstant.dataType.DATE, formatDate: SystemConstant.common.FORMAT_DATE },
					// { prop: "updateUser", label: "修改人", width: 120 },
					// { prop: "updateTime", label: "修改时间", width: 160, type:SystemConstant.dataType.DATE, formatDate:SystemConstant.common.FORMAT_DATE }
				],
				selectedData: false
			};
		},
		methods: {
			searchDelTagOptions(data){
				let _this = this;
				_this.searchForm.delTag.options = data;
			},
			ok(){/* 确定 */
				let _this = this;
				let currentRow = _this.$refs.selectPropertyTable.currentRow
				if(currentRow){
					// 父组件 没有这个方法会报错
					_this.$emit("setPropertyName", currentRow.id, currentRow.name);
				} else {
					util.showMsg(BusinessConstant.SELECTED_ONE_DATA);
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
