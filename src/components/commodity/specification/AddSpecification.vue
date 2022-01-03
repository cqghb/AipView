<template>
	<div>
		
		<div class="demo-block demo-tree">
			<div class="source">
				<div class="custom-tree-container">
					<div class="block">
						<!-- 添加产品规格 -->
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
					<div class="block">
						<router-view @setSpecificationGroup="setSpecificationGroup" @setSpuType="setSpuType"></router-view>
						<!-- <router-view name="typeId"></router-view> -->
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
		name: "AddSpecification",
		components: {
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData: {
					name: "",// 规格名称
					groupIdName: "",// 规格组ID-名称
					groupId: "",// 规格组ID
					typeIdName: "",// 分类ID-名称
					typeId: "",// 分类ID
					addr: "",// 显示位置
					remark: "",// 备注
				},
				formFieldList: {
					name: {
					    type: "Input",
					    label: "规格名称",
					    prop: "name",
					    width: "180px",
					    placeholder: "请输入规格名称...",
					    size: ""
					},
					groupIdName: {
					    type: "Input",
					    label: "产品规格分组名称",
					    prop: "groupIdName",
					    width: "180px",
						readonly: true,
					    placeholder: "请选择产品规格分组名称...",
					    size: "",
						btnArr: [
							{
								label: "选择产品规格分组名称",
								id: "selectGroupIdName",
								type: "primary",
								ref: "selectGroupIdName",
								size: "50px",
								disable: false,
								handle: (me) => {
									let the = this;
									CommInterface.goToPage(SystemConstant.consComponentPath.SELECT_SPECIFICATION_GROUP_ADD_SPECIFICATION, SystemConstant.consComponentName.SELECT_SPECIFICATION_GROUP_ADD_SPECIFICATION,{});
									// return main.default.$router.push({
									//     path: "/addSpecification/specificationGroupList",
									//     name: "SpecificationGroupList"
									// });
								}
							}
						],
						// iconArr: {// 图标信息
						// 	slot: "prefix",
						// 	class: "el-icon-search",
						// }
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
									CommInterface.goToPage(SystemConstant.consComponentPath.SELECT_SPU_TYPE_ADD_SPECIFICATION,SystemConstant.consComponentName.SELECT_SPU_TYPE_ADD_SPECIFICATION,{});
									// the.centerDialogVisible = true;
								}
							}
						],
						// iconArr: {// 图标信息
						// 	slot: "prefix",
						// 	class: "el-icon-search",
						// }
					},
					addr: {
					    type: "Number",
					    label: "位置",
					    prop: "addr",
					    width: "180px",
						step: 1,
					    min: 1,
					    max: 100,
						change: function(v) {
							console.log("当前值",v)
						}
					    
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
						{ required: true, message: "请输入规格名称", trigger: "blur" }
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
		methods: {
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
			},
			setSpecificationGroup(groupId, groupName){
				let _this = this;
				_this.formData.groupId = groupId;
				_this.formData.groupIdName = groupId + "-"+ groupName;
			},
			setSpuType(typeId, typeName){
				let _this = this;
				_this.formData.typeId = typeId;
				_this.formData.typeIdName = typeId + "-" + typeName;
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

<style>
	.custom-tree-container {
	    display: flex;
	    margin: -24px;
	}
	.block {
	    flex: 1;
	    padding: 8px 24px 24px;
	}
	.demo-block {
	    margin-bottom: 24px;
		
		border: 1px solid #ebebeb;
		border-radius: 3px;
		transition: .2s;
	}
	.demo-block .source {
	    padding: 24px;
	}
	
	.demo-tree .block:first-child {
	    border-right: 1px solid #eff2f6;
	}
</style>
