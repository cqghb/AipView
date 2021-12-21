<template>
	<!-- 新增菜单 -->
	<div>
		<update-form
					labelWidth="80px"
					ref="addMenuForm"
		            :formData="formData"
		            :formFieldList="formFieldList"
					:baseFromModel="formData"
		            :size="formSize"
					:rules="rules"
		            :buttonArr="btnHandle"></update-form>
					
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
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="define">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
	
</template>

<script>
	import UpdateForm from "@/components/common/UpdateForm";
	import * as CommInterface from '@/components/utils/commInterface';
	import * as BusinessConstant from '@/components/constant/businessConstant';
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	import BaseTable from "@/components/common/BaseTable";
	import util from "@/components/utils/util";
	
	export default{
		name: "",
		components: {
			"update-form": UpdateForm,
			"base-table": BaseTable
		},
		data() {
			return {
				formData:{
					id:"",//主键
					name:"",//菜单名称
					icon:"",//菜单图标
					parentNode:"",//父节点ID
					defaultSelect:"2",//是否默认选中
					childrenFlag:"",//是否是末端节点
					uri:""//请求地址
				},
				formFieldList:{
					name: {
					    type: "Input",
					    label: "菜单名称",
					    prop: "name",
					    width: "180px",
					    placeholder: "请输入菜单名称...",
					    size: ""
					},
					icon: {
					    type: "Input",
					    label: "菜单图标",
					    prop: "icon",
					    width: "180px",
						readonly: true,
					    placeholder: "请输入菜单图标称...",
					    size: "",
						btnArr:[
							{
								label: "选择菜单图标",
								id: "selectIcon",
								type: "primary",
								ref: "selectIconBtn",
								size: "50px",
								disable: false,
								handle: (me) => {
									let the = this;
									the.centerDialogVisible = true;
								}
							}
						],
						// iconArr: {// 图标信息
						// 	slot: "prefix",
						// 	class: "el-icon-search",
						// }
					},
					parentNode: {
					    type: "Input",
					    label: "父节点ID",
					    prop: "parentNode",
						readonly: true,
					    width: "180px",
					    placeholder: "请输入菜单图标称...",
					    size: ""
					},
					defaultSelect: {
					    type: "Radio",
					    label: "是否默认选中",
					    prop: "defaultSelect",
					    width: "180px",
					    radios: [],
					    size: "",
						change: function(v){
							console.log("您选择的是:",v);
						}
					},
					childrenFlag: {
					    type: "Radio",
					    label: "是否末端节点",
					    prop: "childrenFlag",
					    width: "180px",
					    radios: [],
					    size: "",
						change: function(v){
							console.log("您选择的是:",v);
						}
					},
					uri: {
					    type: "Input",
					    label: "请求地址",
					    prop: "uri",
					    width: "180px",
					    placeholder: "请输入请求地址称...",
					    size: ""
					}
				},
				formSize: "",
				rules:{
					name:[
						{ required: true, message: "请输入菜单名称", trigger: "blur" }
					],
					icon:[
						{ required: true, message: "请选择菜单图标", trigger: "blur" }
					],
					childrenFlag:[
						{required: true, message: "请选择是否末端节点", trigger: "blur"}
					]
				},
				btnHandle:[
					{
					    label:"新增",
					    type:"primary",
					    size: "",
					    handle:()=>{
					        let the = this;
							the.addMenu();
					    }
					},
					{
					    label:"重置",
					    type:"primary",
					    size: "",
					    handle:()=>{
					        let the = this;
					        the.$refs.addMenuForm.$refs.baseForm.$refs.defaultMyForm.resetFields();
					    }
					}
				],
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
							
						}
					}
				],
				tableColumnList:[
					{ prop: "id", label: "ID" },
					{ prop: "name", label: "图标中文名称" },
					{ prop: "englishName", label: "图标英文名称", showIcon: true }
				]
			}
		},
		methods:{
			// searchDefaultSelectedOptions(){// 查询是否默认选中的码值
			// 	let the = this;
			// 	CommInterface.getCodeType(
			// 	    BusinessConstant.CODE_TYPE.MENU_DEFAULT_SELECTED,
			// 		[],
			// 	    function (res) {
			// 	        console.log("菜单默认选中备选项查询结果: ",res);
			// 			let retCode = res.code;
			// 			let retMsg = res.msg;
			// 	        if(SystemConstant.common.RET_CODE == retCode){
			// 	            the.formFieldList.defaultSelect.radios = res.data;
			// 	        } else {
			// 	            util.showMsg("菜单默认选中备选项查询失败", ComponentConstant.MessageProperties.ERROR);
			// 	        }
			// 	    }
			// 	);
			// },
			cancel(){
				let the = this;
				the.centerDialogVisible = false;
				
			},
			define(){
				let the = this;
				the.$refs.iconTable.commonCheck();
				if(the.$refs.iconTable.selectedData){
					let data = the.$refs.iconTable.selectedDataArr[0];
					let iconCode = data.englishName;
					the.formData.icon = iconCode;
					the.formFieldList.icon.iconArr = {
						slot: ComponentConstant.IconShowPosition.PREFIX,
						class: iconCode
					};
					the.centerDialogVisible = false;
				}
				
			},
			addMenu(){// 新增菜单
				let the = this;
				let user = JSON.parse(localStorage.getItem(BusinessConstant.LOCAL_STORAGE_USER));
				the.formData.createUser = user.id;
				the.$refs.addMenuForm.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						// 业务逻辑校验 ... start ...
						let childrenFlag = the.formData.childrenFlag;
						let uri = the.formData.uri;
						if(BusinessConstant.YES == childrenFlag && !uri){
							util.showMsg("新增失败，当新增末端节点时, 请求地址 必填。", ComponentConstant.MessageProperties.ERROR);
							return ;
						}
						
						// 业务逻辑校验 ... end ...
						CommInterface.sendPost(SystemConstant.consMenuManage.ADD, the.formData, function(num){
							if(num>0){
								util.showMsg("新增成功", ComponentConstant.MessageProperties.SUCCESS);
								CommInterface.goToIconList();
							} else {
								util.showMsg("新增失败", ComponentConstant.MessageProperties.ERROR);
							}
						});
					}
				});
				
			}
		},
		created() {
			
		},
		mounted() {
			let the = this;
			let parentNode = the.$route.params.parentNode;
			the.formData.parentNode = parentNode;
			// the.searchDefaultSelectedOptions();
			// 查菜单默认选中备选项
			the.$refs.addMenuForm.searchCode(BusinessConstant.CODE_TYPE.MENU_DEFAULT_SELECTED, [], "菜单默认选备选项查询失败", (data)=>{
				the.formFieldList.defaultSelect.radios = data;
			});
			// 查是否末端节点
			the.$refs.addMenuForm.searchCode(BusinessConstant.CODE_TYPE.YES_OR_NO, [], "是否末端节点备选项查询失败", (data)=>{
				the.formFieldList.childrenFlag.radios = data;
			});
			
		}
	}
	
</script>

<style>
</style>
