<template>
	<!-- 菜单配置数据操作权限 -->
	<div>
		<base-table :uri="uri"
		            ref="dataOperateTable"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					searchFormRef="searchdataOperatForm"
		            :searchHandle="searchHandle"></base-table>
	</div>
</template>

<script>
	import BaseTable from "@/components/common/BaseTable";
	import util from "@/components/utils/util";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as CommInterface from '@/components/utils/commInterface';
	
	export default {
		name: "MenuDataOperateShipSetting",
		components: {
			"base-table": BaseTable,
		},
		data() {
			return {
				menuId: "",
				uri: SystemConstant.consDopManage.FIND_PAGE,
				searchData:{
					name: "",// 操作名称
				},
				searchForm:{
					name: {
						type: "Input",
						label: "操作名称",
						prop: "name",
						width: "180px",
						placeholder: "请输入操作名称...",
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
							the.$refs.dataOperateTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let the = this;
							the.$refs.dataOperateTable.$refs.searchdataOperatForm.$refs.defaultMyForm.resetFields();
						}
					}
				],
				formSize: "",
				operationButtonList:[
					{
						type: "danger",
						icon: "el-icon-delet",
						text: "更新数据操作权限",
						handle:()=>{
							let the = this;
							util.confirm("是否确定要更新数据操作权限", "", "", "", "",function () {// 确认
								the.menuDataOperateShipSetting();
							}, null);
							
						}
					},
				],
				tableColumnList:[
					{ prop: "name", label: "操作名称", width: 180 },
					{ prop: "operateAddr", label: "请求地址", width: 180},
					{ prop: "remark", label: "备注"},
				],
				selectedData: false
			};
		},
		methods: {
			menuDataOperateShipSetting(){
				let the = this;
				the.$refs.dataOperateTable.commonCheckMultipleData();
				if(the.$refs.dataOperateTable.selectedData){
					let dataOperateArr = the.$refs.menuDOSLTable.selectedDataArr;
					// 拿出操作ID
				}
			}
		},
		created() {
			
		},
		mounted() {
			let the = this;
			let name = the.$route.params.name;
			let id = the.$route.params.id;
			the.menuId = id;
 			the.operationButtonList[0].text = "更新 " + name+ " 数据操作权限";
		}
	}
</script>

<style>
</style>
