<template>
	<div>
		<!-- 添加SPU -->
		<div class="demo-block demo-tree">
			<div class="source">
				<div class="custom-tree-container">
					<div class="block">
						<update-form
									labelWidth="80px"
									ref="addForm"
						            :formData="formData"
						            :formFieldList="formFieldList"
									:baseFromModel="formData"
						            :size="formSize"
									:rules="rules"
						            :buttonArr="btnHandle"></update-form>
					</div>
					<div class="block">
						<router-view @setSpuType="setSpuType"
							@setBrand="setBrand"></router-view>
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
		name: "Add",
		components: {
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData: {
					code: "",
					name: "",
					typeId: "",
					typeName: "",
					brandId: "",
					brandName: "",
					briefIntroduction: "",
					detail: "",
					delTag: "",
					remark: "",
				},
				formFieldList: {
					code: {
					    type: "Input",
					    label: "货品编码",
					    prop: "code",
					    width: "180px",
					    placeholder: "请输入货品编码...",
						readonly: true,
					    size: ""
					},
					name: {
					    type: "Input",
					    label: "货品名称",
					    prop: "name",
					    width: "180px",
					    placeholder: "请输入货品名称...",
					    size: ""
					},
					typeId: {
					    type: "Input",
					    label: "货品分类",
					    prop: "typeId",
					    width: "180px",
						readonly: true,
					    placeholder: "请选择货品分类...",
					    size: "",
						btnArr: [
							{
								label: "选择货品分类",
								id: "selectTypeId",
								type: "primary",
								ref: "selectTypeIdBtn",
								size: "50px",
								disable: false,
								handle: (me) => {
									let _this = this;
									CommInterface.goToPage(SystemConstant.consComponentPath.SELECT_SPECIFICATION_GROUP_UPDATE_SPECIFICATION, SystemConstant.consComponentName.SELECT_SPECIFICATION_GROUP_UPDATE_SPECIFICATION,{});
								}
							}
						],
						// iconArr: {// 图标信息
						// 	slot: "prefix",
						// 	class: "el-icon-search",
						// }
					},
					brandId: {
					    type: "Input",
					    label: "品牌",
					    prop: "brandId",
					    width: "180px",
						readonly: true,
					    placeholder: "请选择品牌...",
					    size: "",
						btnArr: [
							{
								label: "选择品牌",
								id: "selectBrandId",
								type: "primary",
								ref: "selectBrandIdBtn",
								size: "50px",
								disable: false,
								handle: (me) => {
									let _this = this;
									CommInterface.goToPage(SystemConstant.consComponentPath.SELECT_SPU_TYPE_UPDATE_SPECIFICATION,SystemConstant.consComponentName.SELECT_SPU_TYPE_UPDATE_SPECIFICATION,{});
								}
							}
						],
						// iconArr: {// 图标信息
						// 	slot: "prefix",
						// 	class: "el-icon-search",
						// }
					},
					briefIntroduction: {
					    type: "Textarea",
					    label: "备注",
					    prop: "briefIntroduction",
					    placeholder: "请输入备注...",
					    size: ""
					},
					delTag: {
						type: "Select",
						label: "删除标志",
						prop: "delTag",
						width: "180px",
						options: [],
						change: function(v){
							console.log("当前值",v);
						}
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
						{ required: true, message: "请输入货品编码", trigger: "blur" }
					],
					name:[
						{ required: true, message: "请输入货品名称", trigger: "blur" }
					],
					typeId:[
						{ required: true, message: "请选择类型", trigger: "blur" }
					],
					brandId:[
						{ required: true, message: "请选择品牌", trigger: "blur" }
					],
					delTag:[
						{ required: true, message: "请选择删除标记", trigger: "blur" }
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
					        _this.$refs.addForm.$refs.baseForm.$refs.defaultMyForm.resetFields();
					    }
					}
				],
			};
		},
		methods: {
			add(){
				let _this = this;
				_this.$refs.addForm.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(SystemConstant.consSpuManage.ADD, _this.formData, function(num){
							if(num>0){
								util.showMsg(MsgConstant.msgCommon.SUCCESS_ADD, ComponentConstant.MessageProperties.SUCCESS);
								CommInterface.goToPage(SystemConstant.consComponentPath.LIST_SPU, SystemConstant.consComponentName.LIST_SPU, {});
							} else {
								util.showMsg(MsgConstant.msgCommon.FAIL_ADD, ComponentConstant.MessageProperties.ERROR);
							}
						});
					}
				});
			},
			setBrand(brandId, brandName){
				let _this = this;
				_this.formData.brandId = brandId;
				_this.formData.brandName = groupId + "-"+ groupName;
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
