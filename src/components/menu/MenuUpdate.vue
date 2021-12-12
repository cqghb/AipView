<template>
	<!-- 
		菜单维护页面 
		不显示出地址是为了防止被黑
	-->
	<div>
		<update-form labelWidth="80px"
					 ref="menuUpdate"
		             :formData="formData"
		             :formFieldList="formFieldList"
		             :size="formSize"
					 :rules="rules"
		             :buttonArr="btnHandle"></update-form>
		<icon-dialog ref="dialogIcon" 
					@updateParentProperty="updateIcon"></icon-dialog>
		<menu-dialog ref="dialogMenu"
					:id="formData.id"
					@updateParentProperty="updateParentNode"></menu-dialog>
	</div>
</template>

<script>
	import UpdateForm from "@/components/common/UpdateForm";
	import IconDialog from "@/components/icon/IconDialog";
	import MenuDialog from "@/components/menu/MenuDialog";
	
	import util from "@/components/utils/util";
	import * as CommInterface from '@/components/utils/commInterface';
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as BusinessConstant from '@/components/constant/businessConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	
	
	export default{
		name: "UpdateMenu",
		components: {
			"update-form": UpdateForm,
			"icon-dialog": IconDialog,
			"menu-dialog": MenuDialog
		},
		data() {
			return {
				formData: {
				    id: "",
				    name: "",
				    icon: "",
					// parentNodeShow: "",
				    parentNode: "",
					childrenFlag:"",//是否是末端节点
				    uri: ""
				},
				formFieldList:{
				    name: {
				        type: "Input",
				        label: "菜单名称",
				        prop: "name",
				        width: "180px",
				        placeholder: "请输入菜单名称...",
				        size: ""
				    },
				    icon: {
				        type: "Input",
				        label: "菜单图标",
				        prop: "icon",
				        width: "180px",
				    	readonly: true,
				        placeholder: "请选择菜单图标称...",
				        size: "",
				    	btnArr:[
				    		{
				    			label: "选择菜单图标",
				    			id: "selectIcon",
				    			type: "primary",
				    			ref: "selectIconBtn",
				    			size: "50px",
				    			disable: false,
				    			handle: (me) => {
				    				let the = this;
				    				the.$refs.dialogIcon.centerDialogVisible = true;
				    			}
				    		}
				    	]
				    },
				    parentNode: {
				        type: "Input",
				        label: "父节点ID",
				        prop: "parentNode",
				    	readonly: true,
				        width: "180px",
				        placeholder: "请选择父菜单...",
				        size: "",
						btnArr:[
							{
								label: "选择父菜单",
								id: "selectParentIcon",
								type: "primary",
								ref: "selectParentIconBtn",
								size: "50px",
								disable: false,
								handle: (me) => {
									let the = this;
									the.$refs.dialogMenu.centerDialogVisible = true;
								}
							}
						]
				    },
				    defaultSelect: {
				        type: "Radio",
				        label: "是否默认选中",
				        prop: "defaultSelect",
				        width: "180px",
				        radios: [],
				        size: "",
				    	change: function(v){
				    		console.log("您选择的是:",v);
				    	}
				    },
					childrenFlag: {
					    type: "Radio",
					    label: "是否末端节点",
					    prop: "childrenFlag",
					    width: "180px",
					    radios: [],
					    size: "",
						change: function(v){
							console.log("您选择的是:",v);
						}
					},
				    uri: {
				        type: "Input",
				        label: "请求地址",
				        prop: "uri",
						//readonly: true,
				        width: "180px",
				        placeholder: "请输入请求地址称...",
				        size: ""
				    }
				},
				formSize: "",
				rules:{
					name:[
						{ required: true, message: "请输入菜单名称", trigger: "blur" }
					],
					parentNode:[
						{required: true, message: "菜单父节点不能为空", trigger: "blur"}
					]
				},
				btnHandle:[
				    {
				        label:"修改",
				        type:"primary",
				        size: "",
				        handle:()=>{
				            let the = this;
				            the.updateMenu();
				        }
				    },{
				        label:"返回",
				        type:"",
				        size: "",
				        handle:()=>{
				            let the = this;
				            CommInterface.goToPage(SystemConstant.consComponentPath.LIST_MENU, SystemConstant.consComponentName.LIST_MENU, {});
				        }
				    }
				]
			};
		},
		methods:{
			queryInfo(id){// 查询需回显的数据
			    let the = this;
			    CommInterface.sendPost(
			        SystemConstant.consMenuManage.QUERY_BY_ID,
			        {
			            id: id
			        },
			        the.dealRes
			    );
			},
			dealRes(res){// 对回显数据预处理
			    let the = this;
			    the.formData = res;
				// let id = res.id;
				// let name = res.name;
				// the.formData.parentNodeShow = name + "-" + id;
			},
			updateIcon(icon){
				let the = this;
				the.formData.icon = icon.englishName;
			},
			updateParentNode(parentMenu){
				console.log('parentMenu',parentMenu)
				let the = this;
				let id = parentMenu.id;
				let name = parentMenu.name;
				// the.formData.parentNodeShow = name + "-" + id;
				the.formData.parentNode = id;
			},
			updateMenu(){// 维护菜单
				let the = this;
				let user = JSON.parse(localStorage.getItem(BusinessConstant.LOCAL_STORAGE_USER));
				the.formData.updateUser = user.id;
				// 业务逻辑校验 ... start ...
				let childrenFlag = the.formData.childrenFlag;
				let uri = the.formData.uri;
				if(BusinessConstant.YES == childrenFlag && !uri){
					util.showMsg("维护失败，当新增末端节点时, 请求地址 必填。", ComponentConstant.MessageProperties.ERROR);
					return ;
				}
				
				// 业务逻辑校验 ... end ...
				console.log("修改的数据", the.formData);
				the.$refs.menuUpdate.$refs.baseForm.$refs.defaultMyForm.validate((volid)=>{
					if(volid){
						CommInterface.sendPost(
						    SystemConstant.consMenuManage.UPDATE,
						    the.formData,
						    function (res) {
						        console.log("修改结果 ",res);
						        if(res>0){
						            util.showMsg("修改成功", ComponentConstant.MessageProperties.SUCCESS);
						            CommInterface.goToPage(SystemConstant.consComponentPath.LIST_MENU, SystemConstant.consComponentName.LIST_MENU, {});
						        } else {
						            util.showMsg("修改失败", ComponentConstant.MessageProperties.ERROR);
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
			console.log(the.$refs.menuUpdate);
			the.$refs.menuUpdate.searchCode(BusinessConstant.CODE_TYPE.MENU_DEFAULT_SELECTED, [], "菜单默认选备选项查询失败", (data)=>{
				the.formFieldList.defaultSelect.radios = data;
			});
			// 查是否末端节点
			the.$refs.menuUpdate.searchCode(BusinessConstant.CODE_TYPE.YES_OR_NO, [], "是否末端节点备选项查询失败", (data)=>{
				the.formFieldList.childrenFlag.radios = data;
			});
			
		}
	}
</script>

<style>
</style>
