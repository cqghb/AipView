<template>
	<div>
		<!-- 添加 -->
		<div class="demo-block demo-tree">
			<div class="source">
				<div class="custom-tree-container">
					<div class="block">
						<update-form
									labelWidth="120px"
									ref="addPropertyOptionForm"
						            :formData="formData"
						            :formFieldList="formFieldList"
									:baseFromModel="formData"
						            :size="formSize"
									:rules="rules"
						            :buttonArr="btnHandle"></update-form>
					</div>
					<div class="block">
						<router-view @setPropertyName="setPropertyName"></router-view>
					</div>
				</div>
			</div>			
		</div>
	</div>
</template>

<script>
	import UpdateForm from "@/components/common/UpdateForm";
	import util from "@/components/utils/util";
	
	import * as CommInterface from '@/components/utils/commInterface';
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
		
	export default {
		name: "AddPropertyOption",
		components: {
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData: {
					value: "",// 产品属性值
					propertyName: "",/* 产品属性名称 */
					attrId: "",/* 产品属性名称ID */
					remark: "",// 备注
				},
				formFieldList: {
					value: {
					    type: "Input",
					    label: "产品属性值",
					    prop: "value",
					    width: "180px",
					    placeholder: "请输入产品属性值...",
					    size: ""
					},
					propertyName: {
					    type: "Input",
					    label: "产品属性名称",
					    prop: "propertyName",
					    width: "180px",
						readonly: true,
					    placeholder: "请选择产品属性名称...",
					    size: "",
						btnArr: [
							{
								label: "选择产品属性名称",
								id: "selectPropertyName",
								type: "primary",
								ref: "selectPropertyName",
								size: "50px",
								disable: false,
								handle: (me) => {
									let the = this;
									CommInterface.goToPage(SystemConstant.consComponentPath.ADD_PO_SELECT_PROPERTY, SystemConstant.consComponentName.ADD_PO_SELECT_PROPERTY,{});
								}
							}
						],
						// iconArr: {// 图标信息
						// 	slot: "prefix",
						// 	class: "el-icon-search",
						// }
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
					value:[
						{ required: true, message: "请输入产品属性值", trigger: "blur" }
					],
					propertyName:[
						{ required: true, message: "请选择产品属性名称", trigger: "blur" }
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
					        _this.$refs.addPropertyOptionForm.$refs.baseForm.$refs.defaultMyForm.resetFields();
					    }
					}
				],
			};
		},
		methods: {
			add(){
				let _this = this;
				_this.$refs.addPropertyOptionForm.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(SystemConstant.consPropertyOptionManage.ADD, _this.formData, function(num){
							if(num>0){
								util.showMsg(MsgConstant.msgCommon.SUCCESS_ADD, ComponentConstant.MessageProperties.SUCCESS);
								CommInterface.goToPage(SystemConstant.consComponentPath.LIST_PROPERTY_OPTION, SystemConstant.consComponentName.LIST_PROPERTY_OPTION, {});
							} else {
								util.showMsg(MsgConstant.msgCommon.FAIL_ADD, ComponentConstant.MessageProperties.ERROR);
							}
						});
					}
				});
			},
			setPropertyName(attrId, propertyName){
				let _this = this;
				_this.formData.attrId = attrId;
				_this.formData.propertyName = attrId + "-"+ propertyName;
			},
			
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
	@import url("../../../../static/css/LeftRight.css");
</style>
