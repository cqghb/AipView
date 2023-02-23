<template>
	<div>
		<!-- 产品添加 -->
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
						<router-view @setPropertyValues="setPropertyValues" 
									@setSpu="setSpu" @setMultipleSpecification="setMultipleSpecification"></router-view>
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
			const validateSpuCode = (rule, value, callback) => {
			  	CommInterface.sendPost(SystemConstant.consSpuManage.QUERY_BY_CODE, {code: value}, function(data){
					if(data){
						return callback(new Error("产品编码不能重复"));
					}
					callback();
			  	});
			};
			return {
				formData: {
					name: "",/** 产品名称 **/ 
					code: "",/** 产品编码 **/
					price: 1.00,/** 产品价格 **/
					skuNumber: 1,/** 产品数量 **/
					spuId: "",/** 产品所属品牌 **/
					spuIdName: "",/** 产品所属品牌 **/
					proOptId: [],/** 产品属性值ID **/
					proOptIdName: "",/** 产品属性值ID **/
					specOptiIdArr: [],/** 规格选项值ID **/
					specOptiIdName: "",/** 规格选项值ID **/
					remark: "",/** 备注 **/
				},
				formFieldList: {
					name: {
					    type: "Input",
					    label: "产品名称",
					    prop: "name",
					    width: "180px",
					    placeholder: "请输入产品名称...",
					    size: ""
					},
					code: {
					    type: "Input",
					    label: "产品编码",
					    prop: "code",
					    width: "180px",
					    placeholder: "请输入产品编码...",
					    size: ""
					},
					price: {
					    type: "Number",
					    label: "产品价格",
					    prop: "price",
					    width: "180px",
						step: 1,
					    min: 0.01,
					    max: 100000,
						precision: 2,/** 小数点后面小数的精度 **/
						change: function(v) {
							console.log("当前值",v)
						}
					    
					},
					skuNumber: {
					    type: "Number",
					    label: "产品数量",
					    prop: "skuNumber",
					    width: "180px",
						step: 1,
					    min: 1,
					    max: 100,
						change: function(v) {
							console.log("当前值",v)
						}
					    
					},
					spuIdName: {
					    type: "Input",
					    label: "货品",
					    prop: "spuIdName",
					    width: "180px",
						readonly: true,
					    placeholder: "请选择货品...",
					    size: "",
						btnArr: [
							{
								label: "选择货品",
								id: "selectSpuIdName",
								type: "primary",
								ref: "selectSpuIdNameBtn",
								size: "50px",
								disable: false,
								handle: (me) => {
									let the = this;
									CommInterface.goToPage(SystemConstant.consComponentPath.ADD_SKU_SELECT_SINGLE_SPU,SystemConstant.consComponentName.ADD_SKU_SELECT_SINGLE_SPU,{});
								}
							}
						],
						// iconArr: {// 图标信息
						// 	slot: "prefix",
						// 	class: "el-icon-search",
						// }
					},
					proOptIdName: {
					    type: "Input",
					    label: "产品属性",
					    prop: "proOptIdName",
					    width: "180px",
						readonly: true,
					    placeholder: "请选择产品属性...",
					    size: "",
						btnArr: [
							{
								label: "选择产品属性",
								id: "selectProOptIdName",
								type: "primary",
								ref: "selectProOptIdNameBtn",
								size: "50px",
								disable: false,
								handle: (me) => {
									let the = this;
									CommInterface.goToPage(SystemConstant.consComponentPath.ADD_SKU_SELECT_PROPERTY_OPTION,SystemConstant.consComponentName.ADD_SKU_SELECT_PROPERTY_OPTION,{});
								}
							}
						],
						// iconArr: {// 图标信息
						// 	slot: "prefix",
						// 	class: "el-icon-search",
						// }
					},
					specOptiIdName: {
					    type: "Input",
					    label: "产品规格",
					    prop: "specOptiIdName",
					    width: "180px",
						readonly: true,
					    placeholder: "请选择产品规格...",
					    size: "",
						btnArr: [
							{
								label: "选择产品规格",
								id: "selectSpecOptiIdName",
								type: "primary",
								ref: "selectSpecOptiIdName",
								size: "50px",
								disable: false,
								handle: (me) => {
									let the = this;
									CommInterface.goToPage(SystemConstant.consComponentPath.ADD_SKU_SELECT_MULTIPLE_SPECIFICATION, SystemConstant.consComponentName.ADD_SKU_SELECT_MULTIPLE_SPECIFICATION,{});
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
						{ required: true, message: "请输入产品名称", trigger: "blur" },
						// { required: true, validator: validateSpuCode, trigger: "blur" },
					],
					code:[
						{ required: true, message: "请输入产品编码", trigger: "blur" }
					],
					price:[
						{ required: true, message: "请输入产品价格", trigger: "blur" }
					],
					skuNumber:[
						{ required: true, message: "请输入产品数量", trigger: "blur" }
					],
					spuIdName:[
						{ required: true, message: "请选择产品品牌", trigger: "blur" }
					],
					proOptIdName:[
						{ required: true, message: "请选择产品属性", trigger: "blur" }
					],
					specOptiIdName:[
						{ required: true, message: "请选择产品规格", trigger: "blur" }
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
						CommInterface.sendPost(SystemConstant.consSkuManage.ADD, _this.formData, function(num){
							if(num>0){
								util.showMsg(MsgConstant.msgCommon.SUCCESS_ADD, ComponentConstant.MessageProperties.SUCCESS);
								CommInterface.goToPage(SystemConstant.consComponentPath.LIST_SKU, SystemConstant.consComponentName.LIST_SKU, {});
							} else {
								util.showMsg(MsgConstant.msgCommon.FAIL_ADD, ComponentConstant.MessageProperties.ERROR);
							}
						});
					}
				});
			},
			setPropertyValues(dataArr){
				let _this = this;
				// let proOptIdTemp = "";
				let proOptIdNameTemp = "";
				_this.formData.proOptId = [];/* 上一次选中的清空 */
				let arrLength = dataArr.length;
				for(let i=0;i<arrLength;i++){
					if(i!=arrLength-1){
						proOptIdNameTemp += dataArr[i].propertyName + ";"
					} else {
						proOptIdNameTemp += dataArr[i].propertyName
					}
					_this.formData.proOptId.push(dataArr[i].id);
				}
				// _this.formData.proOptId = proOptId;
				console.log(_this.formData.proOptId);
				_this.formData.proOptIdName = proOptIdNameTemp;
			},
			setSpu(spuId, spuName){/* 设置SPU */
				let _this = this;
				_this.formData.spuId = spuId;
				_this.formData.spuIdName = spuId + "-" + spuName;
			},
			setMultipleSpecification(dataArr){/* 设置产品规格 */
				let _this = this;				
				let specOptiIdNameTemp = "";
				_this.formData.specOptiIdArr = [];/* 把上一次选中的清空 */
				let arrLength = dataArr.length;
				for(let i=0;i<arrLength;i++){
					if(i!=arrLength-1){
						specOptiIdNameTemp += dataArr[i].name + ";"
					} else {
						specOptiIdNameTemp += dataArr[i].name
					}
					_this.formData.specOptiIdArr.push(dataArr[i].id);
				}
				_this.formData.specOptiIdName = specOptiIdNameTemp;
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
