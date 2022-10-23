<template>
	<div>
		<!-- SPU管理 -->
		<base-table :uri="uri"
		            ref="tableSpu"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					:multiSelect="false"
					searchFormRef="searchSpuForm"
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
						label: "货品名称",
						prop: "name",
						width: "180px",
						placeholder: "请输入货品名称...",
						size:""
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
							_this.$refs.tableSpu.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let _this = this;
							_this.$refs.tableSpu.$refs.searchSpuForm.$refs.defaultMyForm.resetFields();
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
					{ prop: "code", label: "货品编码", width: 180 },
					{ prop: "name", label: "货品名称", width: 180 },
					{ prop: "typeName", label: "货品分类", width: 180 },
					{ prop: "brandName", label: "品牌", width: 180 },
					{ prop: "briefIntroduction", label: "货品简介", width: 180 },
					{ prop: "detail", label: "货品详情", width: 80 },
					{ prop: "delTag", label: "删除标记", width: 80 },
					{ prop: "remark", label: "备注"},
					{ prop: "createUser", label: "创建人", width: 120 },
					{ prop: "createTime", label: "创建时间", width: 160, type:SystemConstant.dataType.DATE, formatDate: SystemConstant.common.FORMAT_DATE },
					{ prop: "updateUser", label: "修改人", width: 120 },
					{ prop: "updateTime", label: "修改时间", width: 160, type:SystemConstant.dataType.DATE, formatDate:SystemConstant.common.FORMAT_DATE }
				],
				selectedData: false
			};
		},
		methods: {
			searchDelTagOptions(data){
				let _this = this;
				_this.searchForm.delTag.options = data;
			},
			add(){// 新增
				let _this = this;
				_this.$refs.tableSpu.toPage(SystemConstant.consComponentPath.ADD_SPU, SystemConstant.consComponentName.ADD_SPU, {});
			},
			update(){// 修改
				let _this = this;
				_this.$refs.tableSpu.selectOneDataToPage(SystemConstant.consComponentPath.UPDATE_SPU, SystemConstant.consComponentName.UPDATE_SPU);
			},
			delete(){// 删除 删除之后只是不让再配置到商品规格中去
				let _this = this;
				_this.$refs.tableSpu.updateDelTag(SystemConstant.consSpuManage.UPDATE_DEL_TAG);
			},
			detail(){// 详情
				let _this = this;
				_this.$refs.tableSpu.selectOneDataToPage(SystemConstant.consComponentPath.DETAIL_SPU, SystemConstant.consComponentName.DETAIL_SPU);
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
						console.log('1222',data);
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
			_this.searchSpuType();
			_this.searchSpuBrand();
		}
	}
</script>

<style scoped="scoped">

</style>
