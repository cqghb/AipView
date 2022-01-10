<template>
	<div>
		<!-- 货品类型管理 -->
		<base-table :uri="uri"
		            ref="spuTypeTable"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					searchFormRef="searchSpuTypeForm"
		            :searchHandle="searchHandle"
					@searchDelTagOptions="searchDelTagOptions"></base-table>
	</div>
</template>

<script>
	import BaseTable from "@/components/common/BaseTable";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as CommInterface from '@/components/utils/commInterface';
	import * as BusinessConstant from '@/components/constant/businessConstant';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	
	import util from "@/components/utils/util";
	
	export default{
		name: "ListSpuType",
		components:{
			"base-table": BaseTable,
		},
		data() {
			return {
				uri: SystemConstant.consSpuTypeManage.FIND_PAGE,
				searchData:{
					name: "",// 节点名称
					delTag: BusinessConstant.NO,// 删除标记
				},
				searchForm:{
					name: {
						type: "Input",
						label: "规格组名称",
						prop: "name",
						width: "180px",
						placeholder: "请输入规格组名称...",
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
							let the = this;
							the.loading = true;
							the.$refs.spuTypeTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let the = this;
							the.$refs.spuTypeTable.$refs.searchSpecificationGroupForm.$refs.defaultMyForm.resetFields();
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
							the.detail();
						}
					},
					{
						type: "primary",
						icon: "el-icon-plus",
						text: "新增",
						handle:()=>{
							let the = this;
							the.add();
						}
					},
					{
						type: "warning",
						icon: "el-icon-edit",
						text: "修改",
						handle:()=>{
							let the = this;
							the.update();
						}
					},
					{
						type: "danger",
						icon: "el-icon-delet",
						text: "删除",
						handle:()=>{
							let the = this;
							util.confirm("", "", "", "", "",function () {// 确认
								the.delete();
							}, null);
							
						}
					},
				],
				tableColumnList:[
					// { prop: "id", label: "ID", width: 180 },
					{ prop: "name", label: "货品类型名称", width: 180 },
					{ prop: "code", label: "货品类型代码", width: 180 },
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
		methods:{
			searchDelTagOptions(data){
				let _this = this;
				_this.searchForm.delTag.options = data;
			},
			add(){
				let _this = this;
				CommInterface.goToPage(SystemConstant.consComponentPath.ADD_SPU_TYPE, SystemConstant.consComponentName.ADD_SPU_TYPE, {});
			},
			update(){
				let _this = this;
				_this.$refs.spuTypeTable.commonCheck();
				if(_this.$refs.spuTypeTable.selectedData){
					let params = _this.$refs.spuTypeTable.selectedDataArr[0];
					let param = {
					        id: params.id
					    };
					CommInterface.goToPage(SystemConstant.consComponentPath.UPDATE_SPU_TYPE, SystemConstant.consComponentName.UPDATE_SPU_TYPE, param);
				}
			},
			delete(){
				let _this = this;
				_this.$refs.spuTypeTable.commonCheck();
				if(_this.$refs.spuTypeTable.selectedData){
					let selectedItem = _this.$refs.spuTypeTable.selectedDataArr[0];
					let id = selectedItem.id;
					CommInterface.sendPost(SystemConstant.consSpuTypeManage.UPDATE_DEL_TAG, {id: id}, function(num){
						if(num>0){
							util.showMsg(MsgConstant.msgCommon.SUCCESS_DELETE, ComponentConstant.MessageProperties.SUCCESS);
							_this.$refs.spuTypeTable.loading = true;
							_this.$refs.spuTypeTable.queryList();
						} else {
							util.showMsg(MsgConstant.msgCommon.FALL_DELETE, ComponentConstant.MessageProperties.ERROR);
						}
					});
				}
			},
			detail(){
				let _this = this;
				_this.$refs.spuTypeTable.commonCheck();
				if(_this.$refs.spuTypeTable.selectedData){
					let params = _this.$refs.spuTypeTable.selectedDataArr[0];
					let param = {
					        id: params.id
					    };
					CommInterface.goToPage(SystemConstant.consComponentPath.DETAIL_SPU_TYPE, SystemConstant.consComponentName.DETAIL_SPU_TYPE, param);
				}
			}
		},
		created() {
			
		},
		mounted() {
			let _this = this;
			// _this.search();
		}
	}
</script>

<style scoped="scoped">
</style>
