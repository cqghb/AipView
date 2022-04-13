<template>
	<div>
		<!-- 产品属性值选中组件 -->
		<base-table :uri="uri"
		            ref="selectPropertyOptionTable"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					:multiSelect="true"
					:crumbs="false"
					searchFormRef="searchProOptForm"
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
	
	
	export default {
		name: "SelectPropertyOption",
		components: {
			"base-table": BaseTable,
		},
		data() {
			return {
				uri: SystemConstant.consPropertyOptionManage.FIND_PAGE,
				searchData:{
					value: "",/* 值 */
				},
				searchForm:{
					value: {
						type: "Input",
						label: "产品属性值",
						prop: "name",
						width: "180px",
						placeholder: "请输入产品属性值...",
						size:""
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
							_this.$refs.selectPropertyOptionTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let _this = this;
							_this.$refs.selectPropertyOptionTable.$refs.searchProOptForm.$refs.defaultMyForm.resetFields();
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
				// _this.searchForm.delTag.options = data;
			},
			ok(){/* 确定 */
				let _this = this;
				// _this.$refs.selectPropertyOptionTable.commonCheck();
				let selectArr = _this.$refs.selectPropertyOptionTable.selectedDataArr;
				console.log(selectArr);
				if(selectArr){
					let tmpArr = [];
					for(let i=0;i<selectArr.length;i++){
						let item = {
							id: "",
							propertyName: selectArr[i].id + "-" + selectArr[i].propertyName
						};
						tmpArr.push(item);
					}
					// 父组件 没有这个方法会报错
					console.log(tmpArr);
					_this.$emit("setPropertyValues", tmpArr);
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
