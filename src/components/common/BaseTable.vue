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
                        :loading="loading"
                        element-loading-text="数据加载中"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        @selection-change="handleSelectionChange"
						row-key="id"
						:load="load"
						:default-expand-all="defaultExpandAll"
						:tree-props="{children: children, hasChildren: 'hasChildren'}"
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="55">
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
							<!-- 是否显示成图标 -->
							<i v-if="item.showIcon" :class="test1(scope,item)"></i>
							<span v-else>{{ test1(scope,item)}}</span>								 							
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
			}
        },
        data(){
            return {
                dataArr:[],// 表格数据
                loading: true,
                params: {},
                selectedDataArr: [],// 选中的数据
                page:{// 分页参数
                    currentPage: 1,// 当前页
                    pageSizeArr:[5, 10, 20, 30, 40],// 可选每页显示数据条数
                    pageSize: 5,// 当前每页显示条数
                    totalSize: 1// 总页数
                },
				selectedData: false,
				children: 'childrenList'// 树形表格子节点的节点名称
            };
        },
        methods:{
			test1(sp,item){
				// console.log("sp:", sp);
				// console.log("tableDataFormatStrateg:", tableDataFormatStrateg);
				let the = this;
				return tableDataFormatStrateg.tableDataFormat.prototype.format(sp.row, item);
				// let columnType = item.type;
				// let columnProp = sp.column.property;
				// console.log('columnType=',columnType);
				// console.log('columnProp=',columnProp);
				// if("Date"==columnType){
				// 	return the.$moment(sp.row[columnProp]).format(SystemConstant.common.YYYY_MM_DD_HH_mm_ss);
				// }else{
				// 	return sp.row[columnProp];
				// }
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
			        util.showMsg("请选择一条数据");
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
			async aaaa(data, item){
				let the = this;
				let transformation = item.transformation;
				// 辅助开发
				if(!transformation){
					console.log("请在表格列中配置transformation属性");
				}
				let prop = item.prop;
				let value = data.row[prop];
				// 不同类型，按不同处理办法，这里先写一个码值转换的
				if(BusinessConstant.CODE_TYPE.YES_OR_NO==transformation){
					let params = [value];
					
					await util.$http.post(SystemConstant.consCodeManage.SEARCH_CODEKEY_VALUE,
						{
							"codeType": BusinessConstant.CODE_TYPE.YES_OR_NO,
							"codeList": params,
						}
					).then(function (res) {
						
						let info = res;
						let codeArr = info.data;
							// 这里只会返回一条,老数据可能存在空的情况
							if(codeArr.length>0){
								console.log("22323233232: ", codeArr[0].label);
								return codeArr[0].label;
							}
						return "";
					});
					
					
					// let res = await CommInterface.getCodeType222(BusinessConstant.CODE_TYPE.YES_OR_NO, params
					// , function(res){
					// 	let codeArr = res.data;
					// 	// 这里只会返回一条,老数据可能存在空的情况
					// 	if(codeArr.length>0){
					// 		console.log('dfdfdfdfdf',codeArr[0].label);
					// 		return codeArr[0].label;
					// 	}
											
					// }
					// );
					// console.log('dfdfdfdfdf',res);
					// .then((res)=>{
					// 	console.log('dfdfdfdfdf',res);
					// 	let codeArr = res.data;
					// 	// 这里只会返回一条,老数据可能存在空的情况
					// 	if(codeArr.length>0){
							
					// 		return codeArr[0].label;
					// 	}
					// });
				}
			},
			load(){
				
			}
        },
        created: function () {
            let the = this;
            the.queryList();
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
