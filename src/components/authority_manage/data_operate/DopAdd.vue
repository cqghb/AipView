<template>
	<!-- 新增数据操作 -->
	<div>
		<update-form
					labelWidth="80px"
					ref="addDopForm"
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
	
	export default {
		name:"DopAdd",
		components:{
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData:{
					name:"",//操作名称
					operateAddr:"",//操作地址
					remark:"",//备注
				},
				formFieldList:{
					name: {
					    type: "Input",
					    label: "操作名称",
					    prop: "name",
					    width: "180px",
					    placeholder: "请输入操作名称...",
					    size: ""
					},
					operateAddr: {
					    type: "Input",
					    label: "操作地址",
					    prop: "operateAddr",
					    width: "180px",
					    placeholder: "请输入操作名称...",
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
					name:[
						{ required: true, message: "请输入操作名称", trigger: "blur" }
					],
					operateAddr:[
						{ required: true, message: "请输入操作地址", trigger: "blur" }
					]
				},
				btnHandle:[
					{
					    label:"新增",
					    type:"primary",
					    size: "",
					    handle:()=>{
					        let the = this;
							the.addDop();
					    }
					},
					{
					    label:"重置",
					    type:"primary",
					    size: "",
					    handle:()=>{
					        let the = this;
					        the.$refs.addDopForm.$refs.baseForm.$refs.defaultMyForm.resetFields();
					    }
					}
				],
			};
		},
		methods:{
			addDop(){
				let the = this;
				the.$refs.addDopForm.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(SystemConstant.consDopManage.ADD, the.formData, function(num){
							if(num>0){
								util.showMsg(MsgConstant.msgCommon.SUCCESS_ADD, ComponentConstant.MessageProperties.SUCCESS);
								CommInterface.goToPage(SystemConstant.consComponentPath.LIST_DOP, SystemConstant.consComponentName.LIST_DOP, {});
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
