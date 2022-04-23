<template>
	<div>
		<!-- SPU产品品牌维护 -->
		<update-form labelWidth="80px"
					 ref="updateSpuBrandForm"
		             :formData="formData"
		             :formFieldList="formFieldList"
		             :size="formSize"
					 :rules="rules"
		             :buttonArr="btnHandle"></update-form>
	</div>
</template>

<script>
	import UpdateForm from "@/components/common/UpdateForm";
	import util from "@/components/utils/util";
	
	import * as CommInterface from '@/components/utils/commInterface';
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as BusinessConstant from '@/components/constant/businessConstant';
	
	export default{
		name: "UpdateSpuBrand",
		components:{
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData: {
				    id: "",
				    code: "",
				    name: "",
					delTag: "",
				    remark: "",
				},
				formFieldList:{
					id: {
					    type: "Input",
					    label: "品牌ID",
					    prop: "id",
					    width: "180px",
					    placeholder: "请输入品牌ID...",
						readonly: true,
					    size: ""
					},
					code: {
					    type: "Input",
					    label: "品牌编码",
					    prop: "code",
					    width: "180px",
					    placeholder: "请输入品牌编码...",
						readonly: true,
					    size: ""
					},
					name: {
					    type: "Input",
					    label: "品牌名称",
					    prop: "name",
					    width: "180px",
					    placeholder: "请输入品牌名称...",
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
						{ required: true, message: "请输入品牌ID", trigger: "blur" }
					],
					code:[
						{ required: true, message: "请输入品牌编码", trigger: "blur" }
					],
					name:[
						{ required: true, message: "请输入品牌名称", trigger: "blur" }
					],
					delTag:[
						{ required: true, message: "请选择删除标志", trigger: "blur" }
					]
				},
				btnHandle:[
				    {
				        label:"修改",
				        type:"primary",
				        size: "",
				        handle:()=>{
				            let the = this;
				            the.update();
				        }
				    },{
				        label:"返回",
				        type:"",
				        size: "",
				        handle:()=>{
				            let the = this;
				            CommInterface.goToPage(SystemConstant.consComponentPath.LIST_SPU_BRAND, SystemConstant.consComponentName.LIST_SPU_BRAND, {});
				        }
				    }
				],
			};
		},
		methods:{
			queryInfo(id){
				let _this = this;
				CommInterface.sendPost(
				    SystemConstant.consSpuSpuBrandManage.QUERY_BY_ID,
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
			update(){
				let _this = this;
				_this.$refs.updateSpuBrandForm.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(
						    SystemConstant.consSpuSpuBrandManage.UPDATE,
						    _this.formData,
						    function (res) {
						        console.log("修改结果 ",res);
						        if(res>0){
						            util.showMsg(MsgConstant.msgCommon.SUCCESS_UPDATE, ComponentConstant.MessageProperties.SUCCESS);
						            CommInterface.goToPage(SystemConstant.consComponentPath.LIST_SPU_BRAND, SystemConstant.consComponentName.LIST_SPU_BRAND, {});
						        } else {
						            util.showMsg(MsgConstant.msgCommon.FAIL_UPDATE, ComponentConstant.MessageProperties.ERROR);
						        }
						
						    }
						);
					}
				});
			}
		},
		created() {
			
		},
		mounted() {
			let _this = this;
			let id = _this.$route.params.id;
			_this.queryInfo(id);
			_this.$refs.updateSpuBrandForm.searchCode(BusinessConstant.CODE_TYPE.YES_OR_NO, [], "",function(data){
				_this.formFieldList.delTag.options = data;
			});
		}
	}
</script>

<style scoped="scoped">
</style>
