<template>
	<!-- 菜单维护页面 -->
	<div>
		<update-form labelWidth="80px"
					 ref="menuUpdate"
		             :formData="formData"
		             :formFieldList="formFieldList"
		             :size="formSize"
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
	import * as CommInterface from '@/components/utils/commInterface';
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as BusinessConstant from '@/components/constant/businessConstant';
	
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
				    uri: {
				        type: "Input",
				        label: "请求地址",
				        prop: "uri",
						readonly: true,
				        width: "180px",
				        placeholder: "请输入请求地址称...",
				        size: ""
				    }
				},
				formSize: "",
				btnHandle:[
				    {
				        label:"修改",
				        type:"primary",
				        size: "",
				        handle:()=>{
				            let the = this;
				            //the.updateUser();
				        }
				    },
				    {
				        label:"重置",
				        type:"primary",
				        size: "",
				        handle:()=>{
				            let the = this;
				            
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
			
		}
	}
</script>

<style>
</style>
