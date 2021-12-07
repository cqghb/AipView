<template>
	<!-- 新增图标 -->
	<div>
		<update-form
					labelWidth="80px"
					ref="addIconForm"
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
	import util from "@/components/utils/util";
	
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	import * as CommInterface from '@/components/utils/commInterface';
	import * as SystemConstant from '@/components/constant/systemConstant';
	
	export default{
		name:"IconAdd",
		components:{
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData:{
					name:"",//图标名称
					englishName:"",//图标英文名称
					index:"",//排列顺序
					remark:"",//备注
				},
				formFieldList:{
					name: {
					    type: "Input",
					    label: "图标名称",
					    prop: "name",
					    width: "180px",
					    placeholder: "请输入图标名称...",
					    size: ""
					},
					englishName: {
					    type: "Input",
					    label: "图标英文名称",
					    prop: "englishName",
					    width: "180px",
					    placeholder: "请输入图标英文名称...",
					    size: ""
					},
					index: {
					    type: "Number",
					    label: "排列顺序",
					    prop: "index",
					    width: "180px",
					    placeholder: "请输入排列顺序...",
					    size: ""
					},
					remark: {
					    type: "Textarea",
					    label: "备注",
					    prop: "remark",
					    width: "180px",
					    placeholder: "请输入备注...",
					    size: ""
					}
				},
				formSize: "",
				rules:{
					englishName:[
						{ required: true, message: "请输入图标英文名称", trigger: "blur" }
					],
				},
				btnHandle:[
					{
					    label:"新增",
					    type:"primary",
					    size: "",
					    handle:()=>{
					        let the = this;
							the.addIcon();
					    }
					},
					{
					    label:"重置",
					    type:"primary",
					    size: "",
					    handle:()=>{
					        let the = this;
					        the.$refs.addIconForm.$refs.baseForm.$refs.defaultMyForm.resetFields();
					    }
					}
				],
			};
		},
		methods:{
			addIcon(){
				let the = this;
				the.$refs.addIconForm.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(SystemConstant.consIconManage.ADD_ICON, the.formData, function(num){
							if(num>0){
								util.showMsg(MsgConstant.msgCommon.SUCCESS_ADD, ComponentConstant.MessageProperties.SUCCESS);
								CommInterface.goToPage(SystemConstant.consComponentPath.LIST_ICON, SystemConstant.consComponentName.LIST_ICON, {});
							} else {
								util.showMsg(MsgConstant.msgCommon.FAIL_ADD, ComponentConstant.MessageProperties.ERROR);
							}
						});
					}
				});
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
