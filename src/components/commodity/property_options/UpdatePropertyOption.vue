<template>
	<div>
		<!-- 维护产品属性值 -->
		<div class="demo-block demo-tree">
			<div class="source">
				<div class="custom-tree-container">
					<div class="block">
						<update-form
									labelWidth="120px"
									ref="updatePropertyOptionForm"
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
	import * as BusinessConstant from '@/components/constant/businessConstant';
	
	export default {
		name: "UpdatePropertyOption",
		components: {
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData: {
					id: "",/* ID */
					value: "",/* 产品属性值 */
					attrId: "",/* 产品属性名称ID */
					propertyName: "",/* 产品属性名称 */
					attrId: "",/* 产品属性名称ID */
					delTag: "",/* 删除标记 */
					remark: "",/* 备注 */
				},
				formFieldList: {
					id: {
					    type: "Input",
					    label: "产品属性值ID",
					    prop: "id",
					    width: "180px",
					    placeholder: "请输入产品属性值ID...",
						readonly: true,
					    size: ""
					},
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
									CommInterface.goToPage(SystemConstant.consComponentPath.UPDATE_PO_SELECT_PROPERTY, SystemConstant.consComponentName.UPDATE_PO_SELECT_PROPERTY,{});
								}
							}
						],
						// iconArr: {// 图标信息
						// 	slot: "prefix",
						// 	class: "el-icon-search",
						// }
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
					    width: "180px",
					    placeholder: "请输入备注...",
					    size: ""
					}
				},
				formSize: "",
				rules:{
					id:[
						{ required: true, message: "请输入产品属性值ID", trigger: "blur" }
					],
					value:[
						{ required: true, message: "请输入产品属性值", trigger: "blur" }
					],
					delTag:[
						{ required: true, message: "删除标志不能为空", trigger: "blur" }
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
					        CommInterface.goToPage(SystemConstant.consComponentPath.LIST_PROPERTY_OPTION, SystemConstant.consComponentName.LIST_PROPERTY_OPTION, {});
					    }
					}
				],
			};
		},
		methods: {
			queryInfo(id){
				let _this = this;
				CommInterface.sendPost(
				    SystemConstant.consPropertyOptionManage.QUERY_DETAIL,
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
			// searchDelTagOptions(data){
			// 	let _this = this;
			// 	_this.formData.delTag.options = data;
			// },
			setPropertyName(attrId, propertyName){
				let _this = this;
				_this.formData.attrId = attrId;
				_this.formData.propertyName = attrId + "-"+ propertyName;
			},
			update(){
				let _this = this;
				_this.$refs.updatePropertyOptionForm.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(SystemConstant.consPropertyOptionManage.UPDATE, _this.formData, function(num){
							if(num>0){
								util.showMsg(MsgConstant.msgCommon.SUCCESS_UPDATE, ComponentConstant.MessageProperties.SUCCESS);
								CommInterface.goToPage(SystemConstant.consComponentPath.LIST_PROPERTY_OPTION, SystemConstant.consComponentName.LIST_PROPERTY_OPTION, {});
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
			_this.$refs.updatePropertyOptionForm.searchCode(BusinessConstant.CODE_TYPE.YES_OR_NO, [], "",function(data){
				_this.formFieldList.delTag.options = data;
			});
		}
	}
</script>

<style scoped="scoped">
	@import url("../../../../static/css/LeftRight.css");
</style>
