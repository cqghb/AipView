<template>
	<div>
		<!-- SPU维护 -->
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
						<router-view @setSpuType="setSpuType"
							@setSpuBrand="setSpuBrand"></router-view>
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
	import * as BusinessConstant from '@/components/constant/businessConstant';
	
	
	export default {
		name: "Update",
		components: {
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData: {
					id: "",
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
					id: {
					    type: "Input",
					    label: "货品ID",
					    prop: "id",
					    width: "180px",
					    placeholder: "请输入货品ID...",
						readonly: true,
					    size: ""
					},
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
					typeName: {
					    type: "Input",
					    label: "货品分类",
					    prop: "typeName",
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
									CommInterface.goToPage(SystemConstant.consComponentPath.UPDATE_SELECT_SPU_TYPE, SystemConstant.consComponentName.UPDATE_SELECT_SPU_TYPE,{});
								}
							}
						],
						// iconArr: {// 图标信息
						// 	slot: "prefix",
						// 	class: "el-icon-search",
						// }
					},
					brandName: {
					    type: "Input",
					    label: "品牌",
					    prop: "brandName",
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
									CommInterface.goToPage(SystemConstant.consComponentPath.UPDATE_SELECT_SPU_BRAND,SystemConstant.consComponentName.UPDATE_SELECT_SPU_BRAND,{});
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
					    label: "货品简介",
					    prop: "briefIntroduction",
					    placeholder: "请输入备注...",
					    size: ""
					},
					detail: {
					    type: "Textarea",
					    label: "货品详情",
					    prop: "detail",
					    placeholder: "请输入货品详情...",
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
					id:[
						{ required: true, message: "请输入货品ID", trigger: "blur" }
					],
					code:[
						{ required: true, message: "请输入货品编码", trigger: "blur" }
					],
					name:[
						{ required: true, message: "请输入货品名称", trigger: "blur" }
					],
					typeName:[
						{ required: true, message: "请选择类型", trigger: "blur" }
					],
					brandName:[
						{ required: true, message: "请选择品牌", trigger: "blur" }
					],
					delTag:[
						{ required: true, message: "请选择删除标记", trigger: "blur" }
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
					        CommInterface.goToPage(SystemConstant.consComponentPath.LIST_SPU, SystemConstant.consComponentName.LIST_SPU, {});
					    }
					}
				],
			};
		},
		methods: {
			queryInfo(id){
				let _this = this;
				CommInterface.sendPost(
				    SystemConstant.consSpuManage.QUERY_BY_ID,
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
				_this.formData.typeName = typeId + "-" + typeName;
			},
			setSpuBrand(brandId, brandName){
				let _this = this;
				_this.formData.brandId = brandId;
				_this.formData.brandName = brandId + "-"+ brandName;
			},
			update(){
				let _this = this;
				_this.$refs.updateForm.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(SystemConstant.consSpuManage.UPDATE, _this.formData, function(num){
							if(num>0){
								util.showMsg(MsgConstant.msgCommon.SUCCESS_UPDATE, ComponentConstant.MessageProperties.SUCCESS);
								CommInterface.goToPage(SystemConstant.consComponentPath.LIST_SPU, SystemConstant.consComponentName.LIST_SPU, {});
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
			_this.$refs.updateForm.searchCode(BusinessConstant.CODE_TYPE.YES_OR_NO, [], "",function(data){
				_this.formFieldList.delTag.options = data;
			});
		}
	}
</script>

<style scoped="scoped">
	@import url("../../../../static/css/LeftRight.css");
</style>
