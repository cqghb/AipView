<template>
	<div>
		<!-- 维护 -->
		<update-form labelWidth="80px"
					 ref="updateForm"
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
	
	export default{
		name: "Update",
		components:{
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData: {
				    id: "",
				    name: "",
				    remark: "",
				},
				formFieldList:{
					name: {
					    type: "Input",
					    label: "规格组名称",
					    prop: "name",
					    width: "180px",
					    placeholder: "请输入规格组名称...",
					    size: ""
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
					name:[
						{ required: true, message: "请输入规格组名称", trigger: "blur" }
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
				            CommInterface.goToPage(SystemConstant.consComponentPath.LIST_SPECIFICATION_GROUP, SystemConstant.consComponentName.LIST_SPECIFICATION_GROUP, {});
				        }
				    }
				],
			};
		},
		methods:{
			queryInfo(id){
				let _this = this;
				CommInterface.sendPost(
				    SystemConstant.consSpecificationGroupManage.QUERY_BY_ID,
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
				_this.$refs.updateForm.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(
						    SystemConstant.consSpecificationGroupManage.UPDATE,
						    _this.formData,
						    function (res) {
						        console.log("修改结果 ",res);
						        if(res>0){
						            util.showMsg(MsgConstant.msgCommon.SUCCESS_UPDATE, ComponentConstant.MessageProperties.SUCCESS);
						            CommInterface.goToPage(SystemConstant.consComponentPath.LIST_SPECIFICATION_GROUP, SystemConstant.consComponentName.LIST_SPECIFICATION_GROUP, {});
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
		}
	}
</script>

<style scoped="scoped">
</style>
