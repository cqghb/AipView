<template>
	<div>
		<!-- 产品属性值管理 -->
		<base-table :uri="uri"
		            ref="propertyOptionTable"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					:multiSelect="false"
					searchFormRef="searchPropertyOptionForm"
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
		name: "ListPropertyOption",
		components: {
			"base-table": BaseTable,
		},
		data() {
			return {
				uri: SystemConstant.consPropertyOptionManage.FIND_PAGE,
				searchData:{
					value: "",/* 值 */
					delTag: businessConstant.NO,// 删除标记
				},
				searchForm:{
					value: {
						type: "Input",
						label: "产品属性值",
						prop: "name",
						width: "180px",
						placeholder: "请输入产品属性值...",
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
							_this.$refs.propertyOptionTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let _this = this;
							_this.$refs.propertyOptionTable.$refs.searchPropertyOptionForm.$refs.defaultMyForm.resetFields();
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
					{ prop: "value", label: "产品属性值", width: 180 },
					{ prop: "propertyName", label: "SKU产品属性名称", width: 180 },
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
			searchDelTagOptions(data){/* 查询删除标记备选项，查询条件中没有可以不要 */
				let _this = this;
				_this.searchForm.delTag.options = data;
			},
			add(){/* 新增 */
				let _this = this;
				_this.$refs.propertyOptionTable.toPage(SystemConstant.consComponentPath.ADD_PROPERTY_OPTION, SystemConstant.consComponentName.ADD_PROPERTY_OPTION, {});
				
			},
			update(){/* 修改 */
				let _this = this;
				_this.$refs.propertyOptionTable.selectOneDataToPage(SystemConstant.consComponentPath.UPDATE_PROPERTY_OPTION, SystemConstant.consComponentName.UPDATE_PROPERTY_OPTION);
				
			},
			delete(){/* 删除 */
				let _this = this;
				_this.$refs.propertyOptionTable.updateDelTag(SystemConstant.consPropertyOptionManage.UPDATE_DEL_TAG);
				
			},
			detail(){/* 详情 */
				let _this = this;
				_this.$refs.propertyOptionTable.selectOneDataToPage(SystemConstant.consComponentPath.DETAIL_PROPERTY_OPTION, SystemConstant.consComponentName.DETAIL_PROPERTY_OPTION);
				
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
