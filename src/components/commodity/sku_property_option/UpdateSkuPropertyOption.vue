<template>
	<div>
		<!-- 维护产品属性 -->
		<div class="demo-block demo-tree">
			<div class="source">
				<div class="custom-tree-container">
					<div class="block">
						<update-form
									labelWidth="130px"
									ref="updateSkuPropertyOptionForm"
						            :formData="formData"
						            :formFieldList="formFieldList"
									:baseFromModel="formData"
						            :size="formSize"
									:rules="rules"
						            :buttonArr="btnHandle"></update-form>
					</div>
					<div class="block">
						<router-view @setPropertyValues="setPropertyValues"></router-view>
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
		name: "UpdateSkuPropertyOption",
		components: {
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData: {
					id: "",/* 属性关系ID */
					skuId: "",/* 产品ID */
					skuIdName: "",/* 产品ID-产品名称 */
					proOptId: "",/* 属性值ID */
					proOptIdName: "",/* 属性值ID-属性值 */
					delTag: "",/* 删除标记 */
					remark: "",/* 备注 */
					listProperty: null,
				},
				formFieldList: {
					id: {
					    type: "Input",
					    label: "属性关系ID",
					    prop: "id",
					    width: "180px",
					    placeholder: "请输入属性关系ID...",
						readonly: true,
					    size: ""
					},
					skuIdName: {
					    type: "Input",
					    label: "产品ID-产品名称",
					    prop: "skuIdName",
					    width: "180px",
					    placeholder: "请输入产品ID-产品名称...",
						readonly: true,
					    size: ""
					},
					// propertyName: {
					//     type: "Input",
					//     label: "产品属性名称",
					//     prop: "propertyName",
					//     width: "180px",
					// 	readonly: true,
					//     placeholder: "请选择产品属性名称...",
					//     size: "",
					// 	btnArr: [
					// 		{
					// 			label: "选择产品属性名称",
					// 			id: "selectPropertyName",
					// 			type: "primary",
					// 			ref: "selectPropertyName",
					// 			size: "50px",
					// 			disable: false,
					// 			handle: (me) => {
					// 				let the = this;
					// 				CommInterface.goToPage(SystemConstant.consComponentPath.UPDATE_SELECT_PROPERTY_OPTION, SystemConstant.consComponentName.UPDATE_SELECT_PROPERTY_OPTION,{});
					// 			}
					// 		}
					// 	],
						
					// },
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
					listProperty: {
					    type: "list",
					    label: "属性列表",
					    prop: "listProperty",
					    width: "180px",
					    placeholder: "请输入备注...",
					    size: "",
						close: (id)=>{
							console.log(id);
							let _this = this;
							let index = null;
							for(let i=0; i<_this.formData.listProperty.length;i++){
								if(id==_this.formData.listProperty[i].id){
									index = i;
									break;
								}
							}
							_this.formData.listProperty.splice(index,1);
							console.log(_this.formData.listProperty);
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
						{ required: true, message: "属性关系ID不能为空", trigger: "blur" }
					],
					skuId:[
						{ required: true, message: "属性关系ID不能为空", trigger: "blur" }
					],
					skuIdName:[
						{ required: true, message: "产品ID-产品名称不能为空", trigger: "blur" }
					],
					proOptId:[
						{ required: true, message: "产品属性值ID不能为空", trigger: "blur" }
					],
					proOptIdName:[
						{ required: true, message: "请选择产品属性值ID-属性值", trigger: "blur" }
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
					        CommInterface.goToPage(SystemConstant.consComponentPath.LIST_SKU_PROPERTY_OPTION, SystemConstant.consComponentName.LIST_SKU_PROPERTY_OPTION, {});
					    }
					}
				],
			};
		},
		methods: {
			queryInfo(id){
				let _this = this;
				CommInterface.sendPost(
				    SystemConstant.consSkuPropertyOptionManage.QUERY_DETAIL,
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
			setPropertyValues(item){
				let _this = this;
				// _this.formData.groupId = groupId;
				// _this.formData.groupIdName = groupId + "-"+ groupName;
				// console.log(item);
				for(let i=0;i<item.length;i++){
					_this.formData.listProperty.push(item[i]);
				}
				
				console.log(_this.formData.listProperty);
			},
			update(){
				let _this = this;
				_this.$refs.updateSkuPropertyOptionForm.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
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
			let skuIdArr = id.split("-");
			let skuId = skuIdArr[1];
			if(!skuId){
				skuId = skuIdArr[0];
			}
			_this.queryInfo(skuId);
			_this.$refs.updateSkuPropertyOptionForm.searchCode(BusinessConstant.CODE_TYPE.YES_OR_NO, [], "",function(data){
				_this.formFieldList.delTag.options = data;
			});
			CommInterface.goToPage(SystemConstant.consComponentPath.UPDATE_SELECT_PROPERTY_OPTION, SystemConstant.consComponentName.UPDATE_SELECT_PROPERTY_OPTION,{});
		}
	}
</script>

<style scoped="scoped">
	@import url("../../../../static/css/LeftRight.css");
</style>
