<template>
	<div>
		<!-- 添加商品规格组 -->
		<update-form
					labelWidth="120px"
					ref="addSpuTypeForm"
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
		name:"AddSpuType",
		components:{
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData:{
					name:"",// 货品类型名称
					code:"",// 货品类型代码
					remark:"",// 备注
				},
				formFieldList:{
					name: {
					    type: "Input",
					    label: "货品类型名称",
					    prop: "name",
					    width: "180px",
					    placeholder: "请输入货品类型名称...",
					    size: ""
					},
					code: {
					    type: "Input",
					    label: "货品类型代码",
					    prop: "code",
					    width: "180px",
					    placeholder: "请输入货品类型代码...",
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
						{ required: true, message: "请输入货品类型名称", trigger: "blur" }
					],
					code:[
						{ required: true, message: "请输入货品类型代码", trigger: "blur" }
					],
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
					        _this.$refs.addSpuTypeForm.$refs.baseForm.$refs.defaultMyForm.resetFields();
					    }
					}
				],
			};
		},
		methods:{
			add(){
				let _this = this;
				_this.$refs.addSpuTypeForm.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(SystemConstant.consSpuTypeManage.ADD, _this.formData, function(num){
							if(num>0){
								util.showMsg(MsgConstant.msgCommon.SUCCESS_ADD, ComponentConstant.MessageProperties.SUCCESS);
								CommInterface.goToPage(SystemConstant.consComponentPath.LIST_SPU_TYPE, SystemConstant.consComponentName.LIST_SPU_TYPE, {});
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