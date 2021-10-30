<template>
	<!-- 左右两边两棵树，左边单选，右边多选，将右边的项配置给左边的项 -->
	<div>
		<bread-crumbs></bread-crumbs>
		<div class="demo-block demo-tree">
			<div class="source">
				<div class="custom-tree-container">
				  <div class="block">
				    <p v-if="leftTreeTheme"> {{ leftTreeTheme }}</p>
					<el-input
					  placeholder="输入关键字进行过滤"
					  v-model="filterText">
					</el-input>
				    <el-tree
				      :data="leftTreeDataList"
					  class="filter-tree"
					  :props="leftDefaultProps"
					  :filter-node-method="filterNode"
				      default-expand-all
					  :node-key="leftNodeKey"
					  highlight-current
					  :current-node-key="leftTreeCurrentCheckKey"
					  @node-click="leftHandler"
					  ref="leftTree">
				    </el-tree>
				  </div>
				  <div class="block">
				    <p v-if="rightTreeTheme"> {{ rightTreeTheme }}</p>
					<el-button @click="editEnable">{{ editEnableLabel  }}</el-button>
					<el-button v-if="!editFlag" v-for="(item, index) in operationButtonList"
					           :key="index"
					           :icon="item.icon"
					           :type="item.type"
					           @click="item.handle()">
					    {{ item.text }}
					</el-button>
					<!-- <el-button v-if="!editFlag" @click="menuDataOperateShipSetting">更新</el-button> -->
				    <el-tree
				      :data="rightTreeDataList"
					  :props="rightDefaultProps"
				      show-checkbox
					  ref="rightTree"
				      :node-key="rightNodeKey"
				      default-expand-all
					  highlight-current
					  :default-checked-keys="rightTreeDefaultCheckedList"
					  :check-on-click-node="true"
					  @node-click="rightHandler"
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
	
	import * as CommInterface from '@/components/utils/commInterface';
	// import * as SystemConstant from '@/components/constant/systemConstant';
	
	
	export default {
		name:"TwoTreeSetting",
		components:{
			"bread-crumbs": BreadCrumbs,
		},
		props:{
			leftTreeTheme:{// 左边树主题
			    type: String,
			    require: false
			},
			rightTreeTheme:{// 右边树主题
			    type: String,
			    require: false
			},
			editEnableLabel:{// 启动右侧树可选按钮
				type: String,
				default: "编辑",
				require: false
			},
			operationButtonList:{// 设置操作相关按钮
			    type: Array,
			    require: false,
			    default: ()=>[]
			},
			leftTreeUri:{// 左侧树查询数据接口
			    type: String,
			    require: true
			},
			rightTreeUri:{// 右侧树查询数据接口
			    type: String,
			    require: true
			},
			leftNodeKey:{// 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
				type: String,
				default: "id",
				require: false
			},
			rightNodeKey:{// 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
				type: String,
				default: "id",
				require: false
			},
			leftTreeCurrentCheckKey:{ // 左侧树默认选中的节点
				type: String,
				default: "",
				require: false
			},
			rightTreeDefaultCheckedList:{ // 右侧树默认选中的节点
				type: Array,
				require: false,
				default:()=>[]
			},
			leftDefaultProps: {// 左侧树组件 配置选项
				type: Object,
				require: false,
				default: ()=>{
					return {
						children: "childrenList",// 子节点
						label: "name",// 节点名称
					};
				}
			},
			rightDefaultProps: {// 右侧树组件 配置选项
				type: Object,
				require: false,
				default: ()=>{
					return {
						children: "childrenList",// 子节点
						label: "name",// 节点名称
						disabled: this.disabledFn
					};
				}
			},
			leftTreeNodeClickEvent:{// 左侧树节点点击事件
			    type: Function,
			    require: false,
				default: ()=>{
					return Function;
				}
			},
			rightTreeNodeClickEvent:{// 右侧树节点点击事件
			    type: Function,
			    require: false,
				default: ()=>{
					return Function;
				}
			},
		},
		data() {
			return {
				editFlag: true,// 默认右侧树不可选则
				leftTreeDataList:[],// 左侧树数据
				rightTreeDataList:[],// 右侧树数据
			}
		},
		methods:{
			editEnable(){// 可选择/不可选择 相互切换
				let _this = this;
				_this.editFlag = _this.editFlag ? false : true;
			},
			disabledFn(){
				let _this = this;
				return _this.editFlag;
			},
			getLeftTreeDataList(){// 查询左侧树数据
				let the = this;
				CommInterface.baseSendGet(
				    the.leftTreeUri,
				    null,
				    function (res) {
				        the.leftTreeDataList = res.rootTree;
				    }
				);
			},
			getRightTreeDataList(){
				let the = this;
				CommInterface.sendPost(
				    the.rightTreeUri,
				    null,
				    function (res) {
				        the.rightTreeDataList = res;
				    }
				);
			},
			filterNode(value, data) {
				if (!value) return true;
				return data.name.indexOf(value) !== -1;
			},
			leftHandler(){
				let _this = this;
				_this.leftTreeNodeClickEvent();
			},
			rightHandler(){
				let _this = this;
				_this.rightTreeNodeClickEvent();
			},
			
		},
		created() {
			
		},
		mounted() {
			let _this = this;
			_this.getMenuDataList();
			_this.getDataOperateList();
			_this.$refs.leftTree.setCurrentKey(_this.leftTreeCurrentCheckKey); 

			// _this.$refs.leftTree.setCurrentKey(this.currentNodekey); 
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
