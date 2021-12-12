<template>
	<!-- 图标维护 -->
	<div>
		<update-form labelWidth="80px"
					 ref="iconUpdate"
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
		name: "IconUpdate",
		components: {
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData: {
				    id: "",
				    name: "",
				    englishName: "",
				    index: 1,
				    remark: "",
				},
				formFieldList:{
					name: {
					    type: "Input",
					    label: "图标名称",
					    prop: "name",
					    width: "180px",
					    placeholder: "请输入图标名称...",
					    size: ""
					},
					englishName: {
					    type: "Input",
					    label: "图标英文名称",
					    prop: "englishName",
					    width: "180px",
					    placeholder: "请输入图标英文名称...",
					    size: ""
					},
					index: {
					    type: "Number",
					    label: "排列顺序",
					    prop: "index",
					    width: "180px",
					    placeholder: "请输入排列顺序...",
					    size: ""
					},
					remark: {
					    type: "Textarea",
					    label: "备注",
					    prop: "remark",
					    //width: "180px",
					    placeholder: "请输入备注...",
					    size: ""
					}
				},
				formSize: "",
				rules:{
					englishName:[
						{ required: true, message: "请输入图标英文名称", trigger: "blur" }
					]
				},
				btnHandle:[
				    {
				        label:"修改",
				        type:"primary",
				        size: "",
				        handle:()=>{
				            let the = this;
				            the.updateIcon();
				        }
				    },{
				        label:"返回",
				        type:"",
				        size: "",
				        handle:()=>{
				            let the = this;
				            CommInterface.goToPage(SystemConstant.consComponentPath.LIST_ICON, SystemConstant.consComponentName.LIST_ICON, {});
				        }
				    }
				]
			};
		},
		methods:{
			queryInfo(id){
				let the = this;
				CommInterface.sendPost(
				    SystemConstant.consIconManage.QUERY_BY_ID,
				    {
				        id: id
				    },
				    the.dealRes
				);
			},
			dealRes(res){// 对回显数据预处理
			    let the = this;
			    the.formData = res;
			},
			updateIcon(){
				let the = this;
				the.$refs.iconUpdate.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(
						    SystemConstant.consIconManage.UPDATE,
						    the.formData,
						    function (res) {
						        console.log("修改结果 ",res);
						        if(res>0){
						            util.showMsg(MsgConstant.msgCommon.SUCCESS_UPDATE, ComponentConstant.MessageProperties.SUCCESS);
						            CommInterface.goToPage(SystemConstant.consComponentPath.LIST_ICON, SystemConstant.consComponentName.LIST_ICON, {});
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
			let the = this;
			let id = the.$route.params.id;
			the.queryInfo(id);
		}
	}
</script>

<style>
</style>
