<template>
	<!-- 新增菜单 -->
	<div>
		<update-form
					labelWidth="80px"
					ref="updateForm"
		            :formData="formData"
		            :formFieldList="formFieldList"
					:baseFromModel="formData"
		            :size="formSize"
					:rules="rules"
		            :buttonArr="btnHandle"></update-form>
	</div>
</template>

<script>
	import UpdateForm from "@/components/common/UpdateForm";
	import * as CommInterface from '@/components/utils/commInterface';
	import * as BusinessConstant from '@/components/constant/businessConstant';
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	
	export default{
		name: "",
		components: {
			"update-form": UpdateForm
		},
		data() {
			return {
				formData:{
					id:"",//主键
					name:"",//菜单名称
					icon:"",//菜单图标
					parentNode:"",//父节点ID
					defaultSelect:"",//是否默认选中
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
								label: "选则菜单图标",
								id: "selectIcon",
								type: "primary",
								ref: "selectIconBtn",
								size: "50px",
								disable: false,
								handle: (me) => {
									let the = this;
									//the.sendVerificationCode();
								}
							}
						]
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
						{ required: true, message: '请输入菜单名称', trigger: 'blur' }
					],
					icon:[
						{ required: true, message: '请输入菜单图标', trigger: 'blur' }
					]
				},
				btnHandle:[
					{
					    label:"新增",
					    type:"primary",
					    size: "",
					    handle:()=>{
					        let the = this;
							
					    }
					},
					{
					    label:"重置",
					    type:"primary",
					    size: "",
					    handle:()=>{
					        let the = this;
					        the.$refs.updateForm.$refs.baseForm.$refs.defaultMyForm.resetFields();
					    }
					}
				]
			}
		},
		methods:{
			searchDefaultSelectedOptions(){// 查询是否默认选中的码值
				let the = this;
				CommInterface.getCodeType(
				    BusinessConstant.CODE_TYPE.MENU_DEFAULT_SELECTED,
					[],
				    function (res) {
				        console.log("菜单默认选中备选项查询结果: ",res);
						let retCode = res.code;
						let retMsg = res.msg;
				        if(SystemConstant.common.RET_CODE == retCode){
				            the.formFieldList.defaultSelect.radios = res.data;
				        } else {
				            util.showMsg("菜单默认选中备选项查询失败", ComponentConstant.MessageProperties.ERROR);
				        }
				    }
				);
			}
		},
		created() {
			
		},
		mounted() {
			let the = this;
			let parentNode = the.$route.params.parentNode;
			the.formData.parentNode = parentNode;
			this.searchDefaultSelectedOptions();
		}
	}
	
</script>

<style>
</style>
