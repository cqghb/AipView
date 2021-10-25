<template>
	<!-- 
	菜单配置数据操作权限 
	这种做法有一个缺陷，当菜单的权限分布在表格的多页时，处理时智慧处理到当前页的数据，因此不用这种方式
	-->
	<div>
		<base-table :uri="uri"
		            ref="dataOperateTable"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					:defaultExpandAll="true"
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
							the.getMenuIdOperData();
														
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
					{
						text:"取消选中",
						icon: "el-icon-delet",
						type:"primary",
						handle:()=>{
							let the = this;
							the.$refs.dataOperateTable.$refs.multipleTable.clearSelection();
						}
					},
					{
						text:"取消选中2",
						icon: "el-icon-delet",
						type:"primary",
						handle:()=>{
							let the = this;
							let rows = the.$refs.dataOperateTable.dataArr[0].childrenList[0];
							the.$refs.dataOperateTable.$refs.multipleTable.toggleRowSelection(rows, false);
						}
					},
					{
						text:"选中2",
						icon: "el-icon-delet",
						type:"primary",
						handle:()=>{
							let the = this;
							let rows = the.$refs.dataOperateTable.$refs.multipleTable.data[0].childrenList[0];
							the.$refs.dataOperateTable.$refs.multipleTable.toggleRowSelection(rows);
							
							// let row = the.$refs.dataOperateTable.dataArr[0].childrenList[0];
							// the.$refs.dataOperateTable.$refs.multipleTable.toggleRowSelection(row);
							// the.$refs.dataOperateTable.$refs.multipleTable.clearSelection();
						}
					}
				],
				tableColumnList:[
					{ prop: "name", label: "操作名称", width: 300 },
					{ prop: "operateAddr", label: "请求地址", width: 240},
					{ prop: "remark", label: "备注"},
				],
				selectedData: false,
				tableDataDDDD: [],
				oldDataOperationList: []// 原来的数据操作权限
			};
		},
		watch:{
			// changeData: function(){
			// 	var _this = this;
			// 	_this.$nextTick(function () {
			// 		_this.getMenuIdOperData();
			// 	});
			// }
		},
		computed: {
			// changeData(){
			// 	const { tableDataDDDD, oldDataOperationList } = this;
			// 	return {tableDataDDDD, oldDataOperationList};
			// }
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
					console.log('params', params);
					return ;
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
			},
			queryMenuDataOperation(){
				// 查询原来的数据操作权限
				let the = this;
				let params = {
					id: the.menuId
				};
				CommInterface.sendPost(
				    SystemConstant.consMenuDataOperateRelationManage.QUERY_BY_MENU_ID,
				    params,
				    function (res) {
						the.oldDataOperationList = res;
						console.log("查询结果 ",the.oldDataOperationList);
				    }
				);
			},
			getMenuIdOperData(){// 重列表中筛选出操作权限
				let the = this;
				// 必须要等页面渲染完毕 且tableDataA、oldDataOperationList数据加载完毕才能执行下面方法
				setTimeout(function () {
				  let tableDataA = the.$refs.dataOperateTable.dataArr;
				  for(let i=0; i<the.oldDataOperationList.length; i++){
					let id1 = the.oldDataOperationList[i].id;
					for(let k=0; k<tableDataA.length; k++){
						let tableDataB = tableDataA[k].childrenList;
						for(let n=0; n<tableDataB.length; n++){
							let id2 = tableDataB[n].id;
							if(id1 == id2){
								the.$refs.dataOperateTable.$refs.multipleTable.toggleRowSelection(tableDataB[n]);
								continue;
							}
						}
					}
					
					continue;
				  }
				  
				}, 1000);
			}
			
		},
		created() {
			let the = this;
			let id = the.$route.params.id;
			the.menuId = id;
			the.queryMenuDataOperation();
		},
		mounted() {
			let the = this;
			let name = the.$route.params.name;
 			the.operationButtonList[0].text = "更新 " + name+ " 数据操作权限";	
			the.getMenuIdOperData();
		}
	}
</script>

<style>
</style>
