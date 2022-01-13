<template>
	<div>
		<!-- 添加产品属性 -->
		<div class="demo-block demo-tree">
			<div class="source">
				<div class="custom-tree-container">
					<div class="block">
						<update-form
									labelWidth="120px"
									ref="addPropertyForm"
						            :formData="formData"
						            :formFieldList="formFieldList"
									:baseFromModel="formData"
						            :size="formSize"
									:rules="rules"
						            :buttonArr="btnHandle"></update-form>
					</div>
					<div class="block">
						<router-view @setSpuType="setSpuType"></router-view>
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
		name: "AddProperty",
		components: {
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData: {
					name: "",// 属性名称
					value: "",// 属性值
					typeIdName: "",// 分类ID-名称
					typeId: "",// 分类ID
					remark: "",// 备注
				},
				formFieldList: {
					name: {
					    type: "Input",
					    label: "产品属性名称",
					    prop: "name",
					    width: "180px",
					    placeholder: "请输入属性名称...",
					    size: ""
					},
					value: {
					    type: "Textarea",
					    label: "产品属性值",
					    prop: "value",
					    width: "180px",
					    placeholder: "请输入属性值...",
					    size: ""
					},
					typeIdName: {
					    type: "Input",
					    label: "货品类型名称",
					    prop: "typeIdName",
					    width: "180px",
						readonly: true,
					    placeholder: "请选择货品类型名称...",
					    size: "",
						btnArr: [
							{
								label: "选择货品规格分组名称",
								id: "selectTypeIdName",
								type: "primary",
								ref: "selectTypeIdNameBtn",
								size: "50px",
								disable: false,
								handle: (me) => {
									let the = this;
									CommInterface.goToPage(SystemConstant.consComponentPath.SELECT_SPU_TYPE_ADD_PROPERTY,SystemConstant.consComponentName.SELECT_SPU_TYPE_ADD_PROPERTY,{});
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
					name:[
						{ required: true, message: "请输入产品属性名称", trigger: "blur" }
					],
					value:[
						{ required: true, message: "请输入产品属性值", trigger: "blur" }
					],
					typeIdName:[
						{ required: true, message: "请选择货品类型名称", trigger: "blur" }
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
					        _this.$refs.addPropertyForm.$refs.baseForm.$refs.defaultMyForm.resetFields();
					    }
					}
				],
			};
		},
		methods: {
			add(){
				let _this = this;
				_this.$refs.addPropertyForm.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(SystemConstant.consPropertyManage.ADD, _this.formData, function(num){
							if(num>0){
								util.showMsg(MsgConstant.msgCommon.SUCCESS_ADD, ComponentConstant.MessageProperties.SUCCESS);
								CommInterface.goToPage(SystemConstant.consComponentPath.LIST_PROPERTY, SystemConstant.consComponentName.LIST_PROPERTY, {});
							} else {
								util.showMsg(MsgConstant.msgCommon.FAIL_ADD, ComponentConstant.MessageProperties.ERROR);
							}
						});
					}
				});
			},
			setSpuType(typeId, typeName){
				let _this = this;
				_this.formData.typeId = typeId;
				_this.formData.typeIdName = typeId + "-" + typeName;
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
