<template>
	<!-- 图标选择窗口 -->
	<div>
		<el-dialog
		  title="选择图标"
		  :visible="centerDialogVisible"
		  width="70%"
		  center>
		  <span>
			  <base-table uri="/icon/findPage"
						  ref="iconTable"
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
	
	export default {
		name: "IconDialog",
		components:{
			"base-table": BaseTable
		},
		props:{
			icon:{// 图标代码
			    type: String,
			    require: false,
			    default: ""
			},
		},
		data(){
			return {
				formSize: "",
				centerDialogVisible: false,
				searchData:{
					id: "",// 主键
					name: ""// 图标中文名称
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
						label: "图标中文名称",
						prop: "name",
						width: "180px",
						placeholder: "请输入图标中文名称...",
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
							the.$refs.iconTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let the = this;
							the.$refs.iconTable.$refs.searchIconForm.$refs.defaultMyForm.resetFields();
						}
					}
				],
				tableColumnList:[
					{ prop: "id", label: "ID" },
					{ prop: "name", label: "图标中文名称" },
					{ prop: "englishName", label: "图标英文名称", showIcon: true }
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
				the.$refs.iconTable.commonCheck();
				if(the.$refs.iconTable.selectedData){
					let data = the.$refs.iconTable.selectedDataArr[0];
					the.centerDialogVisible = false;
					the.$emit(SystemConstant.consChildrenCompUseParentComp.UPDATE_PARENT_PROPERTY, data);// 传出整个对象
				}
				// if(the.$refs.iconTable.selectedData){
				// 	let data = the.$refs.iconTable.selectedDataArr[0];
				// 	//the.formData.icon = data.englishName;
				// 	the.centerDialogVisible = false;
				// 	the.$emit("updateIcon",data.englishName);
				// }
				
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
