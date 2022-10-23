<template>
	<div>
		<!-- 产品管理 -->
		<base-table :uri="uri"
		            ref="tableSku"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					searchFormRef="searchSkuForm"
					:multiSelect="false"
		            :searchHandle="searchHandle" 
					@searchDelTagOptions="searchDelTagOptions"></base-table>
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
		name: "Specification",
		components: {
			"base-table": BaseTable,
		},
		data() {
			return {
				uri: SystemConstant.consSkuManage.FIND_PAGE,
				searchData:{
					id: "",// 产品主键
					code: "",// 产品编码
					name: "",// 产品名称
					delTag: businessConstant.NO,// 删除标记
					typeId: "",// 货品类型
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
						label: "产品名称",
						prop: "name",
						width: "180px",
						placeholder: "请输入规格名称...",
						size:""
					},
					typeId: {
						type: "Select",
						label: "货品类型",
						prop: "typeId",
						width: "180px",
						options: [],
						change: function(v){
							console.log("当前值",v);
						}
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
					},
					delTag: {
						type: "Select",
						label: "删除标志",
						prop: "delTag",
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
							_this.$refs.tableSku.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let _this = this;
							_this.$refs.tableSku.$refs.searchSkuForm.$refs.defaultMyForm.resetFields();
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
							let _this = this;
							_this.detail();
						}
					},
					{
						type: "primary",
						icon: "el-icon-plus",
						text: "新增",
						handle:()=>{
							let _this = this;
							_this.add();
						}
					},
					{
						type: "warning",
						icon: "el-icon-edit",
						text: "修改",
						handle:()=>{
							let _this = this;
							_this.update();
						}
					},
					{
						type: "danger",
						icon: "el-icon-delet",
						text: "删除",
						handle:()=>{
							let _this = this;
							util.confirm("", "", "", "", "",function () {// 确认
								_this.delete();
							}, null);
							
						}
					},
				],
				tableColumnList:[
					{ prop: "id", label: "ID", width: 180 },
					{ prop: "skuCodeName", label: "产品名称", width: 180 },
					{ prop: "price", label: "产品价格", width: 180 },
					{ prop: "skuNumber", label: "产品数量", width: 180 },
					{ prop: "spuCodeName", label: "所属货品", width: 180 },
					{ prop: "spuTypeCodeName", label: "货品类型", width: 180 },
					{ prop: "brandCodeName", label: "所属品牌", width: 180 },
					// { prop: "speIdName", label: "产品规格", width: 180 },
					{ prop: "delTag", label: "删除标记", width: 80 },
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
			searchDelTagOptions(data){/* 获取删除标志的数据源 */
				let _this = this;
				_this.searchForm.delTag.options = data;
			},
			searchSpuType(){/* 查询货品类型 */
				let _this = this;
				CommInterface.searchSPUTypeCode(
					{delTag: businessConstant.NO},
				    function (data) {
						_this.searchForm.typeId.options = data;
				    }
				);
			},
			searchSpuBrand(){/* 查询货品品牌 */
				let _this = this;
				CommInterface.searchSpuBrand(
					{delTag: businessConstant.NO},
				    function (data) {
						_this.searchForm.brandId.options = data;
				    }
				);
			},
			add(){/* 新增 */
				let _this = this;
				_this.$refs.tableSku.toPage(SystemConstant.consComponentPath.ADD_SKU, SystemConstant.consComponentName.ADD_SKU, {});
			},
			update(){/* 维护 */
				let _this = this;
				_this.$refs.tableSku.selectOneDataToPage(SystemConstant.consComponentPath.UPDATE_SKU, SystemConstant.consComponentName.UPDATE_SKU);
			},
			delete(){/* 删除 删除之后只是不让再配置到商品规格中去 */
				let _this = this;
				_this.$refs.tableSku.updateDelTag(SystemConstant.consSpuManage.UPDATE_DEL_TAG);
			},
			detail(){/* 详情 */
				let _this = this;
				_this.$refs.tableSku.selectOneDataToPage(SystemConstant.consComponentPath.DETAIL_SKU, SystemConstant.consComponentName.DETAIL_SKU);
			},
			
		},
		created() {
			let _this = this;
		},
		mounted() {
			let _this = this;
			_this.searchSpuType();
			_this.searchSpuBrand();
		}
	}
</script>

<style scoped="scoped">

</style>
