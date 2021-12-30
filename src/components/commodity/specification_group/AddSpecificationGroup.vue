<template>
	<div>
		<!-- 添加商品规格组 -->
		<update-form
					labelWidth="80px"
					ref="addSpecificationForm"
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
	
	import * as CommInterface from '@/components/utils/commInterface';
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	
	export default{
		name:"AddSpecificationGroup",
		components:{
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData:{
					name:"",// 规格组名称
					remark:"",// 备注
				},
				formFieldList:{
					name: {
					    type: "Input",
					    label: "规格组名称",
					    prop: "name",
					    width: "180px",
					    placeholder: "请输入规格组名称...",
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
						{ required: true, message: "请输入规格组名称", trigger: "blur" }
					],
				},
				btnHandle:[
					{
					    label:"新增",
					    type:"primary",
					    size: "",
					    handle:()=>{
					        let the = this;
							the.add();
					    }
					},
					{
					    label:"重置",
					    type:"primary",
					    size: "",
					    handle:()=>{
					        let the = this;
					        the.$refs.addSpecificationForm.$refs.baseForm.$refs.defaultMyForm.resetFields();
					    }
					}
				],
			};
		},
		methods:{
			add(){
				let _this = this;
				_this.$refs.addSpecificationForm.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(SystemConstant.consSpecificationGroupManage.ADD, _this.formData, function(num){
							if(num>0){
								util.showMsg(MsgConstant.msgCommon.SUCCESS_ADD, ComponentConstant.MessageProperties.SUCCESS);
								CommInterface.goToPage(SystemConstant.consComponentPath.LIST_SPECIFICATION_GROUP, SystemConstant.consComponentName.LIST_SPECIFICATION_GROUP, {});
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
