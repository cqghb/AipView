<template>
	<div>
		<!-- SPU单选 -->
		<base-table :uri="uri"
		            ref="tableSingleSpu"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					:multiSelect="false"
					:crumbs="false"
					searchFormRef="searchSingleSpuForm"
		            :searchHandle="searchHandle" 
					@searchDelTagOptions="searchDelTagOptions"></base-table>
	</div>
</template>

<script>
	import BaseTable from "@/components/common/BaseTable";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as CommInterface from '@/components/utils/commInterface';
	import * as businessConstant from '@/components/constant/businessConstant';
	
	import util from "@/components/utils/util";
	
	
	export default {
		name: "ListSpu",
		components: {
			"base-table": BaseTable,
		},
		data() {
			return {
				uri: SystemConstant.consSpuManage.FIND_PAGE,
				searchData:{
					id: "",
					code: "",
					name: "",// 货品名称
					delTag: businessConstant.NO,// 删除标记
					brandId: "",// 货品品牌
				},
				searchForm:{
					id: {
						type: "Input",
						label: "货品ID",
						prop: "id",
						width: "180px",
						placeholder: "请输入货品ID...",
						size:""
					},
					code: {
						type: "Input",
						label: "货品CODE",
						prop: "code",
						width: "180px",
						placeholder: "请输入货品CODE...",
						size:""
					},
					name: {
						type: "Input",
						label: "货品名称",
						prop: "name",
						width: "180px",
						placeholder: "请输入货品名称...",
						size:""
					},
					brandId: {
						type: "Select",
						label: "货品品牌",
						prop: "brandId",
						width: "180px",
						options: [],
						change: function(v){
							console.log("当前值",v);
						}
					}
					
				},
				searchHandle:[
					{
						label:"查询",
						type:"primary",
						size: "",
						handle:()=>{
							let _this = this;
							_this.loading = true;
							_this.$refs.tableSingleSpu.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let _this = this;
							_this.$refs.tableSingleSpu.$refs.searchSingleSpuForm.$refs.defaultMyForm.resetFields();
						}
					}
				],
				formSize: "",
				operationButtonList:[
					{
						type: "",
						icon: "el-icon-more",
						text: "确定",
						handle:()=>{
							let _this = this;
							_this.ok();
						}
					}
				],
				tableColumnList:[
					{ prop: "id", label: "ID", width: 80 },
					{ prop: "code", label: "货品编码", width: 120 },
					{ prop: "name", label: "货品名称", width: 180 },
					{ prop: "brandName", label: "品牌", width: 180 },
					{ prop: "briefIntroduction", label: "货品简介", width: 180 },
				],
				selectedData: false
			};
		},
		methods: {
			searchDelTagOptions(){},
			ok(){/* 确定 */
				let _this = this;
				let currentRow = _this.$refs.tableSingleSpu.currentRow;
				if(currentRow){
					_this.$emit(businessConstant.CALLBACK_FUNCTION_NAME.SET_SPU, currentRow.id, currentRow.name);
				}
			},
			searchSpuBrand(){/* 查询货品品牌 */
				let _this = this;
				CommInterface.searchSpuBrand(
					{delTag: businessConstant.NO},
				    function (data) {
						_this.searchForm.brandId.options = data;
				    }
				);
			}
			
		},
		created() {
			let _this = this;
		},
		mounted() {
			let _this = this;
			_this.searchSpuBrand();
		}
	}
</script>

<style scoped="scoped">

</style>
