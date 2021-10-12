<template>
	<!-- 菜单与数据操作关系配置页面 -->
	<div>
		<base-table :uri="uri"
		            ref="menuDOSLTable"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					searchFormRef="searchMenuDOSLTForm"
		            :searchHandle="searchHandle"></base-table>
	</div>
</template>

<script>
	import BaseTable from "@/components/common/BaseTable";
	
	import util from "@/components/utils/util";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as BusinessConstant from '@/components/constant/businessConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	import * as CommInterface from '@/components/utils/commInterface';
	
	export default {
		name: "MenuDataOperateShipList",
		components: {
			"base-table": BaseTable,
		},
		data() {
			return {
				uri: SystemConstant.consMenuManage.QUERY_LIST,
				searchData:{
					id: "",// 主键
					name: "",// 节点名称
					parentNode: BusinessConstant.NO2// 父节点标志
				},
				searchForm:{
					id: {
						type: "Input",
						label: "ID",
						prop: "id",
						width: "180px",
						placeholder: "请输入ID...",
						size:""
					},
					name: {
						type: "Input",
						label: "菜单名称",
						prop: "name",
						width: "180px",
						placeholder: "请输入菜单名称...",
						size:""
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
							the.$refs.menuDOSLTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let the = this;
							the.$refs.menuDOSLTable.$refs.searchMenuDOSLTForm.$refs.defaultMyForm.resetFields();
						}
					}
				],
				formSize: "",
				operationButtonList:[
					{
						type: "",
						icon: "el-icon-more",
						text: "数据操作配置详情",
						handle:()=>{
							let the = this;
							the.showDetail();
						}
					},
					{
						type: "primary",
						icon: "el-icon-plus",
						text: "数据操作配置维护",
						handle:()=>{
							let the = this;
							the.settingMenuDataOperateShip();
						}
					}
				],
				tableColumnList:[
					{ prop: "name", label: "菜单名称" }
				],
				selectedData: false
			};
		},
		methods: {
			selectChildrenTiem(){// 只能选择子节点
				let the = this;
				the.$refs.menuDOSLTable.commonCheck();
				if(the.$refs.menuDOSLTable.selectedData){
					let params = the.$refs.menuDOSLTable.selectedDataArr[0];
					let parentNode = params.parentNode;
					if(BusinessConstant.YES != parentNode){
						util.showMsg("请选择末端子节点", ComponentConstant.MessageProperties.ERROR);
						return false;
					}
					return true;
				}
			},
			showDetail(){
				let the = this;
				if(the.selectChildrenTiem()){
					let params = the.$refs.menuDOSLTable.selectedDataArr[0];
					let queryParam = {
						id: params.id
					};
					CommInterface.goToPage(SystemConstant.consComponentPath.DETAIL_DOSL, SystemConstant.consComponentName.DETAIL_DOSL, queryParam);
				}
				console.log("123")
			},
			settingMenuDataOperateShip(){
				let the = this;
				if(the.selectChildrenTiem()){
					let params = the.$refs.menuDOSLTable.selectedDataArr[0];
					let param = {
							id: params.id,
					        name: params.name
					    };
					CommInterface.goToPage(SystemConstant.consComponentPath.UPDATE_DOSL, SystemConstant.consComponentName.UPDATE_DOSL, param);
				}
			}
		},
		created() {
			
		},
		mounted() {
			
		}
	}
</script>

<style>
</style>
