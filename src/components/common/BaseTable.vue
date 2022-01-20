<template>
    <div>
        <bread-crumbs v-if="crumbs"></bread-crumbs>
        <!-- 条件查询 start -->
        <el-row class="row">
            <el-col :span="24">
                <!--
				这个组件不要了
				 <search-form
                        labelWidth="80px"
                        :searchData="searchData"
                        :searchForm="searchForm"
                        :size="formSize"
                        :searchHandle="searchHandle"></search-form> -->
				<base-form
							:formData="searchData"
							:ref="searchFormRef"
							:formFieldList="searchForm"
							:baseFromModel="searchData"
							:size="formSize"
							:myInline="true"
							:rules="rules"
							:buttonArr="searchHandle"></base-form>
                <!--<el-form :inline="true" :model="params">
                    <el-form-item v-for="(item, index) in queryFieldList" :label="item.label" :key="index">
                        <el-input v-model="item.name"
                                  :placeholder="item.placeholder"
                                  :prefix-icon="item.prefixIcon"
                                  :maxlength="item.maxlength"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" type="primary" @click="query">查询</el-button>
                        <el-button icon="el-icon-close" type="primary" @click="clearParams">清空</el-button>
                    </el-form-item>
                </el-form>-->
            </el-col>
        </el-row>
        <!-- 条件查询 end -->

        <!-- 操作按钮 start -->
        <el-row class="row">
            <el-col :span="24">
                <el-button v-for="(item, index) in operationButtonList"
                           :key="index"
                           :icon="item.icon"
                           :type="item.type"
                           @click="item.handle()">
                    {{ item.text }}
                </el-button>
            </el-col>
        </el-row>
        <!-- 操作按钮 end -->

        <!-- 列表展示 start -->
        <el-row class="row">
            <el-col :span="24">
                <el-table
                        :data="dataArr"
                        ref="multipleTable"
                        @row-click="handelClickRow"
                        border
						:stripe="true"
						highlight-current-row
                        :loading="loading"
                        element-loading-text="数据加载中"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        @selection-change="handleSelectionChange"
						@current-change="handleCurrentChange2"
						row-key="id"
						:load="load"
						:default-expand-all="defaultExpandAll"
						:tree-props="{children: children, hasChildren: 'hasChildren'}"
                        style="width: 100%">
						<!-- 多选 -->
                    <el-table-column
                            type="selection"
							v-if="multiSelect"
                            width="50">
                    </el-table-column>
					<!-- 
					单选: el-radio 的v-model与label的值一样就是选中状态。
					单选要求查询出的数据必须要有id属性，且值唯一
					-->
					<el-table-column
					        width="50" 
							label="选择"
							v-else>
							<template slot-scope="scope">
								<el-radio v-model="templateRadio" 
								@change.native="radioEvent(scope)"
								:label="scope.row.id">&nbsp;</el-radio>
							</template>
					</el-table-column>
                    <el-table-column v-for="(item, index) in tableColumnList"
                                     :key="index"
                                     :prop="item.prop"
                                     :label="item.label"
                                     :width="item.width"
									 :show-overflow-tooltip="showOverflowTooltip"
									 >
									 
						<template slot-scope="scope">
							<!-- 码值转换 -->
							<!-- <span v-if="'codeValue'==item.codeValueConversion" v-html="aaaa(scope, item)"></span>								 -->
							<!-- 
							是否显示成图标：显示图标就不显示文字
							-->
							<i v-if="item.showIcon" :class="test1(scope,item)"></i>
							<span v-html="test1(scope,item)"></span>	
							<!-- <span v-html="test1(scope,item)">{{ test1(scope,item)}}</span>	 -->
						</template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="page.currentPage"
                        :page-sizes="page.pageSizeArr"
                        :page-size="page.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="page.totalSize">
                </el-pagination>
            </el-col>
        </el-row>
        <!-- 列表展示 end -->
    </div>
</template>

<script>
    // import SearchForm from "@/components/common/SearchForm";
    import BreadCrumbs from "@/components/common/BreadCrumbs";
	import BaseForm from "@/components/common/BaseForm";
	import tableDataFormatStrateg from "@/components/utils/table-data-format-strategy";
	import * as CommInterface from '@/components/utils/commInterface';
	
	import util from "@/components/utils/util";
	
    import * as SystemConstant from '@/components/constant/systemConstant';
	import * as BusinessConstant from '@/components/constant/businessConstant';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	
    export default {
        name: "BaseTable",
        components:{
            // "search-form": SearchForm,
            "bread-crumbs": BreadCrumbs,
			"base-form": BaseForm
        },
        props:{
            uri:{// 数据请求地址
                type: String,
                require: true
            },
			searchFormRef:{
				type: String,
				required: false
			},
            formSize:{
                type: String,
                require: false
            },
			defaultExpandAll: {// 如果是树形表格，是否默然展开所有，默认不展开
				type: Boolean,
				require: false,
				default: false
			},
			showOverflowTooltip: {// 表格展示不完的数据显示方式 true 鼠标移动上去的时候展示全部 false 单行展示
				type: Boolean,
				require: false,
				default: true
			},
            operationButtonList:{// 操作按钮
                type: Array,
                require: false,
                default: ()=>[]
            },
            tableColumnList:{// 表头
                type: Array,
                require: false,
                default: ()=>[]
            },
            searchForm:{
                type: Object,
				require: false,
                default: ()=>{}
            },
            searchHandle:{
                type:Array,
                default:()=>[]
            },
            searchData:{
                type:Object,
                default: ()=>{}
            },
			rules:{// 表单验证规则
				type: Object,
				require: false,
				default: ()=>{}
			},
			crumbs:{// 是否显示面包屑
				type: Boolean,
				require: false,
				default: true
			},
			multiSelect:{// 表格是否多选，true:多选;false: 单选
				type: Boolean,
				require: false,
				default: true
			},
        },
        data(){
            return {
                dataArr:[],// 表格数据
                loading: true,
                params: {},
                selectedDataArr: [],/* 多选时，选中的数据全部放到这里 */
                page:{// 分页参数
                    currentPage: 1,// 当前页
                    pageSizeArr:[5, 10, 20, 30, 40],// 可选每页显示数据条数
                    pageSize: 5,// 当前每页显示条数
                    totalSize: 1// 总页数
                },
				templateRadio: "",/* 单选按钮绑定的值，只是为了让按钮出于选中状态，无其他意义 */
				currentRow: null,/* 当前选中的数据，单选时，选中的数据存这里 */
				selectedData: false,
				children: 'childrenList'// 树形表格子节点的节点名称
            };
        },
        methods:{
			test1 (sp,item){
				let the = this;
				// let a = "";
				
				//     let bb = tableDataFormatStrateg.tableDataFormat.prototype.format(sp.row, item).then(r=>{
				// 		console.log('r',r);
				// 	});
					
				// 	console.log('bb',bb);
				// 	return bb;
				
				// await tableDataFormatStrateg.tableDataFormat.prototype.format(sp.row, item).then(res=>{
				// 	a = res;
				// });
				// return a;
				return tableDataFormatStrateg.tableDataFormat.prototype.format(sp.row, item);
			},
            clearParams(){// 清空条件输入框
                let the = this;
            },
            handelClickRow(row){// 单击表格行事件
                let the = this;
                the.$refs.multipleTable.toggleRowSelection(row);
            },
            handleSelectionChange(val){// 选中表格数据事件
                let the = this;
                the.selectedDataArr = val;
				// console.log(the.$refs.multipleTable);
            },
            handleSizeChange(val){// 分页组件每页数据条数改变触发事件
                let the = this;
                the.loading = true;
                the.page.pageSize = val;
                the.queryList();
            },
            handleCurrentChange(val){// 分页组件当前页发生变化触发事件
                let the = this;
                the.loading = true;
                the.currentPage = val;
                the.queryList();
            },
            queryList(){// 查询数据
                let the = this;
                let uri = the.uri;
                console.log("searchData",the.searchData);
                console.log("page",the.page);
                the.$http.post(uri,{
                    currentPage: the.page.currentPage,
                    pageSize: the.page.pageSize,
                    params: the.searchData
                }).then(function (res) {
                    the.dataArr = res.data.content;
                    the.page.totalSize = res.data.totalSize;
                    the.page.currentPage = res.data.currentPage;
                    the.loading = false;
                });
            },
			commonCheck(){// 公共检查-只能选择一行数据
			    let the = this;
			    let num = the.selectedDataArr.length;
			    if(num==0){
			        util.showMsg(BusinessConstant.SELECTED_ONE_DATA);
			    }
			    if(num>1){
			        util.showMsg("请不要多选");
			    }
			    if(1==num){
			        the.selectedData = true;
			    }
			},
			commonCheckMultipleData(){// 公共检查-可以选择多行数据，但是不能一行都不选择
			    let the = this;
			    let num = the.selectedDataArr.length;
			    if(num==0){
			        util.showMsg("请至少选择一行数据");
			    }
			    the.selectedData = true;
			},
			searchDelTagOptions(){
				let _this = this;
				CommInterface.getCodeType(
				    BusinessConstant.CODE_TYPE.YES_OR_NO,
					[],
				    function (res) {
						let retCode = res.code;
						let retMsg = res.msg;
				        if(SystemConstant.common.RET_CODE == retCode){
				            // _this.searchForm.delTag.options = res.data;
							_this.$emit("searchDelTagOptions", res.data);
				        } else {
				            util.showMsg("删除标记备选项查询失败", ComponentConstant.MessageProperties.ERROR);
				        }
				    }
				);
			},
			handleCurrentChange2(row){/* 单选会触发 */
				let _this = this;
				_this.currentRow = row;
				_this.templateRadio = row.id;/* 如果没有ID将不会出现选中效果 */
			},
			radioEvent(sp){/* 单选按钮点击时执行事件，暂时有没有用 */
				let _this = this;
			},
			selectOneDataToPage(componentPath, componentName){
				/* 
				* 选中一条数据，然后跳转到页面; 进入修改页面、详情页面可以使用。
				* componentPath: 组件的URI
				* componentName:组件的名称； 
				*/
			    let _this = this;
			    let item = _this.currentRow;
			    if(item){
			    	let param = {
			    	        id: item.id
			    	    };
			    	CommInterface.goToPage(componentPath, componentName, param);
			    } else {
			    	util.showMsg(businessConstant.SELECTED_ONE_DATA);
			    }
			},
			updateDelTag(uri){
				/* 
				* uri:后端接口地址； 删除数据刷新页面 
				*/
			    let _this = this;
			    let item = _this.currentRow;
			    if(item){
					let id = item.id;
					let delTag = item.delTag;
					if(businessConstant.YES==delTag){
						util.showMsg(businessConstant.DELETED);
					} else {
						CommInterface.sendPost(uri, {id: id}, function(num){
							if(num>0){
								util.showMsg(MsgConstant.msgCommon.SUCCESS_DELETE, ComponentConstant.MessageProperties.SUCCESS);
								_this.loading = true;
								_this.queryList();
							} else {
								util.showMsg(MsgConstant.msgCommon.FALL_DELETE, ComponentConstant.MessageProperties.ERROR);
							}
						});
					}
			    } else {
			    	util.showMsg(businessConstant.SELECTED_ONE_DATA);
			    }
			},
			toPage(componentPath, componentName, params){
				/*
				* 进入新页面，可以携带参数，可用于进入新增页面。
				* componentPath: 组件的URI
				* componentName: 组件的名称
				* params: 参数
				*/
				let _this = this;
				CommInterface.goToPage(componentPath, componentName, params);
			},
			load(){
				
			}
        },
        created: function () {
            let _this = this;
            _this.queryList();
			_this.searchDelTagOptions();
        },
        mounted() {
            let the = this;
        }
    }
</script>

<style scoped>
    .row{
        margin-bottom: 8px;
    }
</style>
