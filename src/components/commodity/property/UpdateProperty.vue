<template>
	<div>
		<!-- 维护 -->
		<div class="demo-block demo-tree">
			<div class="source">
				<div class="custom-tree-container">
					<div class="block">
						<update-form
									labelWidth="120px"
									ref="updatePropertyForm"
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
		name: "UpdateProperty",
		components: {
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData: {
					id: "",// ID
					name: "",// 产品属性名称
					typeIdName: "",// 分类ID-名称
					typeId: "",// 分类ID
					remark: "",// 备注
				},
				formFieldList: {
					id: {
					    type: "Input",
					    label: "产品属性ID",
					    prop: "id",
					    width: "180px",
					    placeholder: "请输入产品属性ID...",
						readonly: true,
					    size: ""
					},
					name: {
					    type: "Input",
					    label: "产品属性名称",
					    prop: "name",
					    width: "180px",
					    placeholder: "请输入产品属性名称...",
					    size: ""
					},
					typeIdName: {
					    type: "Input",
					    label: "产品所属货品类型",
					    prop: "typeIdName",
					    width: "180px",
						readonly: true,
					    placeholder: "请选择货品类型...",
					    size: "",
						btnArr: [
							{
								label: "选择货品类型",
								id: "selectTypeIdName",
								type: "primary",
								ref: "selectTypeIdNameBtn",
								size: "50px",
								disable: false,
								handle: (me) => {
									let _this = this;
									CommInterface.goToPage(SystemConstant.consComponentPath.SELECT_SPU_TYPE_UPDATE_PROPERTY,SystemConstant.consComponentName.SELECT_SPU_TYPE_UPDATE_PROPERTY,{});
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
					id:[
						{ required: true, message: "请输入产品属性ID", trigger: "blur" }
					],
					name:[
						{ required: true, message: "请输入产品属性名称", trigger: "blur" }
					],
					typeIdName:[
						{ required: true, message: "请选择货品类型", trigger: "blur" }
					],
				},
				btnHandle:[
					{
					    label:"维护",
					    type:"primary",
					    size: "",
					    handle:()=>{
					        let _this = this;
							_this.update();
					    }
					},
					{
					    label:"返回",
					    type:"",
					    size: "",
					    handle:()=>{
					        let _this = this;
					        CommInterface.goToPage(SystemConstant.consComponentPath.LIST_PROPERTY, SystemConstant.consComponentName.LIST_PROPERTY, {});
					    }
					}
				],
			};
		},
		methods: {
			queryInfo(id){
				let _this = this;
				CommInterface.sendPost(
				    SystemConstant.consPropertyManage.QUERY_DETAIL,
				    {
				        id: id
				    },
				    _this.dealRes
				);
			},
			dealRes(res){// 对回显数据预处理
			    let _this = this;
			    _this.formData = res;
			},
			setSpuType(typeId, typeName){
				let _this = this;
				_this.formData.typeId = typeId;
				_this.formData.typeIdName = typeId + "-" + typeName;
			},
			update(){
				let _this = this;
				_this.$refs.updatePropertyForm.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(SystemConstant.consPropertyManage.UPDATE, _this.formData, function(num){
							if(num>0){
								util.showMsg(MsgConstant.msgCommon.SUCCESS_UPDATE, ComponentConstant.MessageProperties.SUCCESS);
								CommInterface.goToPage(SystemConstant.consComponentPath.LIST_PROPERTY, SystemConstant.consComponentName.LIST_PROPERTY, {});
							} else {
								util.showMsg(MsgConstant.msgCommon.FAIL_UPDATE, ComponentConstant.MessageProperties.ERROR);
							}
						});
					}
				});
			},
		},
		created() {
			let _this = this;
		},
		mounted() {
			let _this = this;
			let id = _this.$route.params.id;
			_this.queryInfo(id);
		}
	}
</script>

<style scoped="scoped">
	@import url("../../../../static/css/LeftRight.css");
</style>
