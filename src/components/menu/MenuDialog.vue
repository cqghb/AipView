<template>
	<!-- 
		菜单弹出框 
		选择父菜单的时候不能选中自己，采用后端控制，不把自己查出来
	-->
	<div>
		<el-dialog
		  title="选择父菜单"
		  :visible="centerDialogVisible"
		  width="70%"
		  center>
		  <span>
			  <base-table :uri="uri"
			  			ref="menuTable"
			  			:tableColumnList="tableColumnList"
			  			:searchData="searchData"
			  			:searchForm="searchForm"
			  			:formSize="formSize"
			  			searchFormRef="searchIconForm"
			  			:crumbs="false"
			  			:searchHandle="searchHandle"></base-table>
		  </span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取消</el-button>
		    <el-button type="primary" @click="define">确定</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	import BaseTable from "@/components/common/BaseTable";
	import * as SystemConstant from '@/components/constant/systemConstant';
	
	export default{
		name: "DialogTableMenu",
		components: {
			"base-table": BaseTable
		},
		props:{
			id : {// 菜单ID
			    type: String,
			    require: false,
			    default: ""
			},
		},
		data() {
			return {
				uri: SystemConstant.consMenuManage.QUERY_PARENT_MENU,
				formSize: "",
				centerDialogVisible: false,
				searchData:{
					id: "",// 主键
					name: "",// 节点名称
					theId: "",// 本节点ID
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
							the.$refs.menuTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let the = this;
							
						}
					}
				],
				tableColumnList:[
					{ prop: "id", label: "ID"},
					{ prop: "name", label: "菜单名称" },
				]
				
			};
		},
		methods:{
			cancel(){
				let the = this;
				the.centerDialogVisible = false;
			},
			define(){
				let the = this;
				the.$refs.menuTable.commonCheck();
				if(the.$refs.menuTable.selectedData){
					let data = the.$refs.menuTable.selectedDataArr[0];
					the.centerDialogVisible = false;
					the.$emit(SystemConstant.consChildrenCompUseParentComp.UPDATE_PARENT_PROPERTY, data);// 传出整个对象
				}
				
			}
		},
		created() {
			
		},
		mounted() {
			let the = this;
			the.searchData.theId = the.id;
		}
	}
</script>

<style>
</style>
