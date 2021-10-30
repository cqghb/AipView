<template>
	<!-- 
	菜单配置数据操作权限 
	-->
	<div>
		<bread-crumbs></bread-crumbs>
		<div class="demo-block demo-tree">
			<div class="source">
				<div class="custom-tree-container">
				  <div class="block">
				    <p>菜单树</p>
					<el-input
					  placeholder="输入关键字进行过滤"
					  v-model="filterText">
					</el-input>
				    <el-tree
				      :data="menuDataList"
					  class="filter-tree"
					  :props="defaultProps"
					  :filter-node-method="filterNode"
				      default-expand-all
					  highlight-current
					  @node-click="menuTreeNodeClick"
					  ref="menuTree">
				    </el-tree>
				  </div>
				  <div class="block">
				    <p>数据操作权限树</p>
					<el-button @click="editEnable">数据操作权限更新</el-button>
					<el-button v-if="!editFlag" @click="menuDataOperateShipSetting">更新</el-button>
				    <el-tree
				      :data="dataOperateList"
					  :props="defaultProps2"
				      show-checkbox
					  ref="dataOperTree"
				      node-key="id"
				      default-expand-all
					  highlight-current
					  :default-checked-keys="dataOperateListDefaultCheck"
					  :check-on-click-node="true"
				      :expand-on-click-node="true">
				    </el-tree>
				  </div>
				</div>
			</div>
		</div>
	</div>
	
	
</template>

<script>
	import BreadCrumbs from "@/components/common/BreadCrumbs";
	import util from "@/components/utils/util";
	
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as CommInterface from '@/components/utils/commInterface';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as BusinessConstant from '@/components/constant/businessConstant';
	
	export default {
		name: "MenuDataOperateShipSetting2",
		components: {
			"bread-crumbs": BreadCrumbs,
		},
		data() {
			return {
				menuDataList:[],// 左侧菜单数据
				dataOperateList:[],// 右侧操作权限数据
				defaultProps: {
				          children: "childrenList",
				          label: "name",
				        },
				defaultProps2: {
				          children: "childrenList",
				          label: "name",
						  disabled: this.disabledFn
				        },
				dataOperateListDefaultCheck:[],
				filterText: '',
				menuId: "",
				uri: SystemConstant.consCodeManage.FIND_PAGE_CHILDREN,
				editFlag: true,// 右边树是否可以选中
				
			};
		},
		watch:{
			filterText(val) {
			    this.$refs.menuTree.filter(val);
			}
		},
		computed: {
		},
		methods: {
			getMenuDataList(){
				let the = this;
				CommInterface.baseSendGet(
				    SystemConstant.consMenuManage.QUERY_MENU,
				    null,
				    function (res) {
				        the.menuDataList = res.rootTree;
				    }
				);
			},
			getDataOperateList(){
				let the = this;
				CommInterface.sendPost(
				    SystemConstant.consCodeManage.FIND_PAGE_CHILDREN2,
				    null,
				    function (res) {
				        the.dataOperateList = res;
				    }
				);
			},
			filterNode(value, data) {
				if (!value) return true;
				return data.name.indexOf(value) !== -1;
			},
			menuDataOperateShipSetting(){
				let the = this;
				let checkedNodeArr = the.$refs.dataOperTree.getCheckedNodes();
				let checkedIdList = [];
				for(let i=0; i<checkedNodeArr.length; i++){
					// 根全部不要
					if(checkedNodeArr[i].childrenList){
						continue;
					}
					checkedIdList.push(checkedNodeArr[i].id);
				}
				// 拿出操作ID
				let params = {
					menuId: the.menuId,
					dataOperateList: checkedIdList
				};
				
				console.log('params', params);
				
				CommInterface.sendPost(
				    SystemConstant.consMenuDataOperateRelationManage.UPDATE,
				    params,
				    function (res) {
				        console.log("修改结果 ",res);
				        if(res>0){
				            util.showMsg(MsgConstant.msgCommon.SUCCESS_UPDATE, ComponentConstant.MessageProperties.SUCCESS);
				        } else {
				            util.showMsg(MsgConstant.msgCommon.FAIL_UPDATE, ComponentConstant.MessageProperties.ERROR);
				        }
				
				    }
				);
			},
			queryMenuDataOperation(){
				// 查询原来的数据操作权限
				let the = this;
				let params = {
					id: the.menuId
				};
				CommInterface.sendPost(
				    SystemConstant.consMenuDataOperateRelationManage.QUERY_BY_MENU_ID,
				    params,
				    function (res) {
						console.log("查询结果 ",res);
						let oldDataOperationList = [];// 原来的数据操作权限
						for(let i=0; i<res.length; i++){
							oldDataOperationList.push(res[i].id);
						}
						the.$refs.dataOperTree.setCheckedKeys(oldDataOperationList);
				    }
				);
			},
			menuTreeNodeClick(data, nodeObj, nodeComp){
				console.log('a', data);
				console.log('b', nodeObj);
				console.log('c', nodeComp);
				let _this = this;
				_this.menuId = data.id;
				let childrenFlag = data.childrenFlag;
				// 点击根菜单才去查相关菜单权限
				if(BusinessConstant.YES==childrenFlag){
					_this.queryMenuDataOperation();
				} else {
					// 清空权限
					_this.$refs.dataOperTree.setCheckedKeys([]);
				}
			},
			disabledFn(){
				let _this = this;
				
				return _this.editFlag;
			},
			editEnable(){
				let _this = this;
				_this.editFlag = _this.editFlag ? false : true;
			}
			
		},
		created() {
			
		},
		mounted() {
			let the = this;
			the.getMenuDataList();
			the.getDataOperateList();
			
		}
	}
</script>

<style>
	.custom-tree-container {
	    display: flex;
	    margin: -24px;
	}
	.block {
	    flex: 1;
	    padding: 8px 24px 24px;
	}
	.demo-block {
	    margin-bottom: 24px;
		
		border: 1px solid #ebebeb;
		border-radius: 3px;
		transition: .2s;
	}
	.demo-block .source {
	    padding: 24px;
	}
	
	.demo-tree .block:first-child {
	    border-right: 1px solid #eff2f6;
	}
</style>
