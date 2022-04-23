<template>
	<div>
		<!-- 添加SPU品牌 -->
		<update-form
					labelWidth="80px"
					ref="addSpuBrandForm"
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
		name:"AddSpuBrand",
		components:{
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData:{
					code: "",
					name: "",
					remark: "",
				},
				formFieldList:{
					code: {
					    type: "Input",
					    label: "品牌编码",
					    prop: "code",
					    width: "180px",
					    placeholder: "请输入品牌编码...",
					    size: ""
					},
					name: {
					    type: "Input",
					    label: "品牌名称",
					    prop: "name",
					    width: "180px",
					    placeholder: "请输入品牌名称...",
					    size: ""
					},
					remark: {
					    type: "Textarea",
					    label: "备注",
					    prop: "remark",
					    placeholder: "请输入备注...",
					    size: ""
					}
				},
				formSize: "",
				rules:{
					code:[
						{ required: true, message: "请输入品牌编码", trigger: "blur" }
					],
					name:[
						{ required: true, message: "请输入品牌名称", trigger: "blur" }
					]
				},
				btnHandle:[
					{
					    label:"新增",
					    type:"primary",
					    size: "",
					    handle:()=>{
					        let _this = this;
							    _this.add();
					    }
					},
					{
					    label:"重置",
					    type:"primary",
					    size: "",
					    handle:()=>{
					        let _this = this;
					        _this.$refs.addSpuBrandForm.$refs.baseForm.$refs.defaultMyForm.resetFields();
					    }
					}
				],
			};
		},
		methods:{
			add(){
				let _this = this;
				_this.$refs.addSpuBrandForm.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(SystemConstant.consSpuSpuBrandManage.ADD, _this.formData, function(num){
							if(num>0){
								util.showMsg(MsgConstant.msgCommon.SUCCESS_ADD, ComponentConstant.MessageProperties.SUCCESS);
								CommInterface.goToPage(SystemConstant.consComponentPath.LIST_SPU_BRAND, SystemConstant.consComponentName.LIST_SPU_BRAND, {});
							} else {
								util.showMsg(MsgConstant.msgCommon.FAIL_ADD, ComponentConstant.MessageProperties.ERROR);
							}
						});
					}
				});
			}
		},
		created() {
			let _this = this;
		},
		mounted() {
			let _this = this;
		}
	}
</script>

<style scoped="scoped">

</style>
