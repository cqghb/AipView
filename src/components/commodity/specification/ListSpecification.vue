<template>
	<div>
		<!-- 产品规格管理 -->
		<base-table :uri="uri"
		            ref="specificationTable"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					searchFormRef="searchSpecificationForm"
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
							_this.$refs.specificationTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let _this = this;
							_this.$refs.specificationTable.$refs.searchSpecificationForm.$refs.defaultMyForm.resetFields();
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
					// { prop: "id", label: "ID", width: 180 },
					{ prop: "name", label: "规格名称", width: 180 },
					{ prop: "groupId", label: "SKU产品规格组ID", width: 180 },
					{ prop: "groupId", label: "SKU产品规格组名称", width: 180 },
					{ prop: "typeId", label: "SPU商品分类ID", width: 180 },
					{ prop: "typeId", label: "SPU商品分类名称", width: 180 },
					{ prop: "addr", label: "显示位置", width: 180 },
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
			searchDelTagOptions(data){
				let _this = this;
				_this.searchForm.delTag.options = data;
			},
			add(){// 新增
				let _this = this;
				CommInterface.goToPage(SystemConstant.consComponentPath.ADD_SPECIFICATION, SystemConstant.consComponentName.ADD_SPECIFICATION, {});
			},
			update(){// 修改
				let _this = this;
				_this.$refs.specificationTable.commonCheck();
				if(_this.$refs.specificationTable.selectedData){
					let params = _this.$refs.specificationTable.selectedDataArr[0];
					let param = {
					        id: params.id
					    };
					CommInterface.goToPage(SystemConstant.consComponentPath.UPDATE_SPECIFICATION, SystemConstant.consComponentName.UPDATE_SPECIFICATION, param);
				}
			},
			delete(){// 删除 删除之后只是不让再配置到商品规格中去
				let _this = this;
				_this.$refs.specificationTable.commonCheck();
				if(_this.$refs.specificationTable.selectedData){
					let selectedItem = _this.$refs.specificationTable.selectedDataArr[0];
					let id = selectedItem.id;
					CommInterface.sendPost(SystemConstant.consSpecificationManage.UPDATE_DEL_TAG, {id: id}, function(num){
						if(num>0){
							util.showMsg(MsgConstant.msgCommon.SUCCESS_DELETE, ComponentConstant.MessageProperties.SUCCESS);
							_this.$refs.specificationTable.loading = true;
							_this.$refs.specificationTable.queryList();
						} else {
							util.showMsg(MsgConstant.msgCommon.FALL_DELETE, ComponentConstant.MessageProperties.ERROR);
						}
					});
				}
			},
			detail(){// 详情
				let _this = this;
				_this.$refs.specificationTable.commonCheck();
				if(_this.$refs.specificationTable.selectedData){
					let params = _this.$refs.specificationTable.selectedDataArr[0];
					let param = {
					        id: params.id
					    };
					CommInterface.goToPage(SystemConstant.consComponentPath.DETAIL_SPECIFICATION, SystemConstant.consComponentName.DETAIL_SPECIFICATION, param);
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
