<template>
	<!-- 修改数据操作 -->
	<div>
		<update-form labelWidth="80px"
					 ref="dopUpdate"
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
	
	export default {
		name:"DopUpdate",
		components:{
			"update-form": UpdateForm,
		},
		data() {
			return {
				formData: {
				    id: "",
				    name:"",//操作名称
				    operateAddr:"",//操作地址
					delTag: "2",// 是否删除
				    remark:"",//备注
				},
				formFieldList:{
					name: {
					    type: "Input",
					    label: "操作名称",
					    prop: "name",
					    width: "180px",
					    placeholder: "请输入操作名称...",
					    size: ""
					},
					operateAddr: {
					    type: "Input",
					    label: "操作地址",
					    prop: "operateAddr",
					    width: "180px",
					    placeholder: "请输入操作名称...",
					    size: ""
					},
					delTag: {
					    type: "Radio",
					    label: "是否删除",
					    prop: "delTag",
					    width: "180px",
					    radios: [],
					    size: "",
						change: function(v){
							console.log("您选择的是:",v);
						}
					},
					subgroup: {
					    type: "Select",
					    label: "所属分组",
					    prop: "subgroup",
					    width: "180px",
					    options: [],
					    size: "",
						change: function(v){
							console.log("您选择的是:",v);
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
						{ required: true, message: "请输入操作名称", trigger: "blur" }
					],
					operateAddr:[
						{ required: true, message: "请输入操作地址", trigger: "blur" }
					],
					subgroup:[
						{ required: true, message: "请选择所属分组", trigger: "blur" }
					]
				},
				btnHandle:[
				    {
				        label:"修改",
				        type:"primary",
				        size: "",
				        handle:()=>{
				            let the = this;
				            the.updateDop();
				        }
				    },{
				        label:"返回",
				        type:"",
				        size: "",
				        handle:()=>{
				            let the = this;
				            CommInterface.goToPage(SystemConstant.consComponentPath.LIST_DOP, SystemConstant.consComponentName.LIST_DOP, {});
				        }
				    }
				]
			};
		},
		methods:{
			queryInfo(id){
				let the = this;
				CommInterface.sendPost(
				    SystemConstant.consDopManage.QUERY_BY_ID,
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
			updateDop(){
				let the = this;
				the.$refs.dopUpdate.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(
						    SystemConstant.consDopManage.UPDATE,
						    the.formData,
						    function (res) {
						        console.log("修改结果 ",res);
						        if(res>0){
						            util.showMsg(MsgConstant.msgCommon.SUCCESS_UPDATE, ComponentConstant.MessageProperties.SUCCESS);
						            CommInterface.goToPage(SystemConstant.consComponentPath.LIST_DOP, SystemConstant.consComponentName.LIST_DOP, {});
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
			the.$refs.dopUpdate.searchCode(BusinessConstant.CODE_TYPE.DEL_TAG, [], "删除标记查询失败", (data)=>{
				the.formFieldList.delTag.radios = data;
			});
			the.$refs.dopUpdate.searchCode(BusinessConstant.CODE_TYPE.DATA_OPERATE_SUBGROUP, [], "数据操作分组选备选项查询失败", (data)=>{
				the.formFieldList.subgroup.options = data;
			});
		}
	}
</script>

<style>
</style>
