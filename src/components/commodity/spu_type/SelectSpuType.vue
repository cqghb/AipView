<template>
	<div>
		<!-- 商品规格组管理 -->
		<base-table :uri="uri"
		            ref="selectSpuTypeTable"
		            :operationButtonList="operationButtonList"
		            :tableColumnList="tableColumnList"
		            :searchData="searchData"
		            :searchForm="searchForm"
		            :formSize="formSize"
					:crumbs="false"
					searchFormRef="searchSelectSpuTypeForm"
		            :searchHandle="searchHandle"></base-table>
	</div>
</template>

<script>
	import BaseTable from "@/components/common/BaseTable";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	// import * as CommInterface from '@/components/utils/commInterface';
	// import * as BusinessConstant from '@/components/constant/businessConstant';
	// import * as ComponentConstant from '@/components/constant/componentConstant';
	
	// import util from "@/components/utils/util";
	
	export default{
		name: "SelectSpuType",
		components:{
			"base-table": BaseTable,
		},
		data() {
			return {
				uri: SystemConstant.consSpuTypeManage.FIND_PAGE,
				searchData:{
					name: "",// 节点名称
					// delTag: BusinessConstant.NO,// 删除标记
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
					// delTag: {
					// 	type: "Select",
					// 	label: "删除标志",
					// 	prop: "delTag",
					// 	width: "180px",
					// 	options: [],
					// 	change: function(v){
					// 		console.log("当前值",v);
					// 	}
					// }
					
				},
				searchHandle:[
					{
						label:"查询",
						type:"primary",
						size: "",
						handle:()=>{
							let the = this;
							the.loading = true;
							the.$refs.selectSpuTypeTable.queryList();// 调子组件的方法
						}
					},
					{
						label:"重置",
						type:"primary",
						size: "",
						handle:()=>{
							let the = this;
							the.$refs.selectSpuTypeTable.$refs.searchSelectSpuTypeForm.$refs.defaultMyForm.resetFields();
						}
					}
				],
				formSize: "",
				operationButtonList:[
					{
						type: "primary",
						icon: "el-icon-plus",
						text: "确定",
						handle:()=>{
							let the = this;
							the.thisData();
						}
					}
				],
				tableColumnList:[
					{ prop: "id", label: "ID", width: 180 },
					{ prop: "name", label: "货品类型名称", width: 180 },
					{ prop: "remark", label: "备注"},
				],
				selectedData: false
			};
		},
		methods:{
			// search(){
			// 	let _this = this;
			// 	CommInterface.getCodeType(
			// 	    BusinessConstant.CODE_TYPE.YES_OR_NO,
			// 		[],
			// 	    function (res) {
			// 			let retCode = res.code;
			// 			let retMsg = res.msg;
			// 	        if(SystemConstant.common.RET_CODE == retCode){
			// 	            _this.searchForm.delTag.options = res.data;
			// 	        } else {
			// 	            util.showMsg("删除标记备选项查询失败", ComponentConstant.MessageProperties.ERROR);
			// 	        }
			// 	    }
			// 	);
			// },
			thisData(){
				let _this = this;
				_this.$refs.selectSpuTypeTable.commonCheck();
				if(_this.$refs.selectSpuTypeTable.selectedData){
					let params = _this.$refs.selectSpuTypeTable.selectedDataArr[0];
					// 父组件 没有这个方法会报错
					_this.$emit("setSpuType", params.id, params.name);
				}
				
				
			},
			
		},
		created() {
			
		},
		mounted() {
			let _this = this;
			// _this.search();
		}
	}
</script>

<style>
</style>
