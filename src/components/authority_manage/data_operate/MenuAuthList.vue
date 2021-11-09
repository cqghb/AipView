<template>
	<!-- 菜单数据操作权限管理页面 -->
	<div>
		<base-table :uri="uri"
		            ref="dopTable"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					searchFormRef="searchDopForm"
		            :searchHandle="searchHandle"></base-table>
	</div>
</template>

<script>
	import BaseTable from "@/components/common/BaseTable";
	import util from "@/components/utils/util";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as CommInterface from '@/components/utils/commInterface';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	
	export default {
		name: "MenuAuthList",
		components: {
			"base-table": BaseTable,
		},
		data() {
			return {
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
							the.$refs.dopTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let the = this;
							the.$refs.dopTable.$refs.searchDopForm.$refs.defaultMyForm.resetFields();
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
							the.showDetail();
						}
					},
					{
						type: "primary",
						icon: "el-icon-plus",
						text: "新增",
						handle:()=>{
							let the = this;
							the.addDop();
						}
					},
					{
						type: "warning",
						icon: "el-icon-edit",
						text: "修改",
						handle:()=>{
							let the = this;
							the.updateDop();
						}
					},
					{
						type: "danger",
						icon: "el-icon-delet",
						text: "删除",
						handle:()=>{
							let the = this;
							util.confirm("", "", "", "", "",function () {// 确认
								the.deleteDop();
							}, null);
							
						}
					},
				],
				tableColumnList:[
					// { prop: "id", label: "ID", width: 180 },
					{ prop: "name", label: "操作名称", width: 180 },
					{ prop: "operateAddr", label: "请求地址", width: 180},
					{ prop: "subgroup", label: "所属分组", width: 180},
					// { prop: "remark", label: "备注"},
					{ prop: "createUser", label: "创建人", width: 180 },
					{ prop: "createTime", label: "创建时间", width: 180, type:SystemConstant.dataType.DATE, formatDate: SystemConstant.common.FORMAT_DATE },
					{ prop: "updateUser", label: "修改人", width: 180 },
					{ prop: "updateTime", label: "修改时间", width: 180, type:SystemConstant.dataType.DATE, formatDate:SystemConstant.common.FORMAT_DATE }
				],
				selectedData: false
			};
		},
		methods:{
			showDetail(){
				let the = this;
				the.$refs.dopTable.commonCheck();
				if(the.$refs.dopTable.selectedData){
				    let params = the.$refs.dopTable.selectedDataArr[0];
				    let queryParam = {
						id: params.id
					};
				    CommInterface.goToPage(SystemConstant.consComponentPath.DETAIL_DOP, SystemConstant.consComponentName.DETAIL_DOP, queryParam);
				}
			},
			addDop(){
				let the = this;
				let param = {
				        item: null
				    };
				if(the.$refs.dopTable.selectedDataArr){
					let params = the.$refs.dopTable.selectedDataArr[0];
					param.item = params;
				}
				CommInterface.goToPage(SystemConstant.consComponentPath.ADD_DOP, SystemConstant.consComponentName.ADD_DOP, param);
			},
			updateDop(){
				let the = this;
				the.$refs.dopTable.commonCheck();
				if(the.$refs.dopTable.selectedData){
					let params = the.$refs.dopTable.selectedDataArr[0];
					let param = {
					        id: params.id
					    };
					CommInterface.goToPage(SystemConstant.consComponentPath.UPDATE_DOP, SystemConstant.consComponentName.UPDATE_DOP, param);
				}
			},
			deleteDop(){
				let the = this;
				the.$refs.dopTable.commonCheck();
				if(the.$refs.dopTable.selectedData){
					let selectedItem = the.$refs.dopTable.selectedDataArr[0];
					let id = selectedItem.id;
					CommInterface.sendPost(SystemConstant.consDopManage.UPDATE_DEL_TAG, {id: id}, function(num){
						if(num>0){
							util.showMsg(MsgConstant.msgCommon.SUCCESS_DELETE, ComponentConstant.MessageProperties.SUCCESS);
							the.$refs.dopTable.loading = true;
							the.$refs.dopTable.queryList();
						} else {
							util.showMsg(MsgConstant.msgCommon.FALL_DELETE, ComponentConstant.MessageProperties.ERROR);
						}
					});
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
