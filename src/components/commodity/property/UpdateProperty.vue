<template>
	<div>
		<!-- 维护 -->
		<div class="demo-block demo-tree">
			<div class="source">
				<div class="custom-tree-container">
					<div class="block">
						<update-form
									labelWidth="80px"
									ref="updateForm"
						            :formData="formData"
						            :formFieldList="formFieldList"
									:baseFromModel="formData"
						            :size="formSize"
									:rules="rules"
						            :buttonArr="btnHandle"></update-form>
					</div>
					<div class="block">
						<router-view @setSpecificationGroup="setSpecificationGroup" @setSpuType="setSpuType"></router-view>
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
		name: "Update",
		components: {
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData: {
					id: "",// ID
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
					groupIdName:[
						{ required: true, message: "请选择产品规格分组名称", trigger: "blur" }
					],
					typeIdName:[
						{ required: true, message: "请选择货品类型名称", trigger: "blur" }
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
					        CommInterface.goToPage(SystemConstant.consComponentPath.LIST_SPECIFICATION, SystemConstant.consComponentName.LIST_SPECIFICATION, {});
					    }
					}
				],
			};
		},
		methods: {
			queryInfo(id){
				let _this = this;
				CommInterface.sendPost(
				    SystemConstant.consSpecificationManage.QUERY_DETAIL,
				    {
				        id: id
				    },
				    _this.dealRes
				);
			},
			dealRes(res){// 对回显数据预处理
			    let _this = this;
			    _this.formData = res;
				console.log('_this.formData0',_this.formData);
			},
			setSpecificationGroup(groupId, groupName){
				let _this = this;
				_this.formData.groupId = groupId;
				_this.formData.groupIdName = groupId + "-"+ groupName;
				console.log('_this.formData2',_this.formData);
			},
			setSpuType(typeId, typeName){
				let _this = this;
				_this.formData.typeId = typeId;
				_this.formData.typeIdName = typeId + "-" + typeName;
			},
			update(){
				let _this = this;
				_this.$refs.updateForm.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(SystemConstant.consSpecificationManage.UPDATE, _this.formData, function(num){
							if(num>0){
								util.showMsg(MsgConstant.msgCommon.SUCCESS_UPDATE, ComponentConstant.MessageProperties.SUCCESS);
								CommInterface.goToPage(SystemConstant.consComponentPath.LIST_SPECIFICATION, SystemConstant.consComponentName.LIST_SPECIFICATION, {});
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
