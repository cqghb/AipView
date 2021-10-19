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
	import * as ComponentConstant from '@/components/constant/componentConstant';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as BusinessConstant from '@/components/constant/businessConstant';
	
	export default {
		name: "MenuDataOperateShipSetting",
		components: {
			"base-table": BaseTable,
		},
		data() {
			return {
				menuId: "",
				uri: SystemConstant.consCodeManage.FIND_PAGE_CHILDREN,
				searchData:{
					name: "",// 操作名称
					codeType: BusinessConstant.CODE_TYPE.DATA_OPERATE_SUBGROUP,// 操作名称
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
					{ prop: "name", label: "操作名称", width: 300 },
					{ prop: "operateAddr", label: "请求地址", width: 240},
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
					let dataOperateArr = the.$refs.dataOperateTable.selectedDataArr;
					// 拿出操作ID
					let params = {
						menuId: the.menuId,
						dataOperateList: []
					};
					for(let i=0; i<dataOperateArr.length;i++){
						params.dataOperateList.push(dataOperateArr[i].id);
					}
					CommInterface.sendPost(
					    SystemConstant.consMenuDataOperateRelationManage.UPDATE,
					    params,
					    function (res) {
					        console.log("修改结果 ",res);
					        if(res>0){
					            util.showMsg(MsgConstant.msgCommon.SUCCESS_UPDATE, ComponentConstant.MessageProperties.SUCCESS);
					        } else {
					            util.showMsg(MsgConstant.msgCommon.FAIL_UPDATE, ComponentConstant.MessageProperties.ERROR);
					        }
					
					    }
					);
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
