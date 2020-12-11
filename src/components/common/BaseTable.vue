<template>
    <div>
        <bread-crumbs></bread-crumbs>
        <!-- 条件查询 start -->
        <el-row class="row">
            <el-col :span="24">
                <search-form
                        labelWidth="80px"
                        :searchData="searchData"
                        :searchForm="searchForm"
                        :size="formSize"
                        :searchHandle="searchHandle"></search-form>
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
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column v-for="(item, index) in tableColumnList"
                                     :key="index"
                                     :prop="item.prop"
                                     :label="item.label"
                                     :width="item.width">
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
    import SearchForm from "@/components/common/SearchForm";
    import BreadCrumbs from "@/components/common/BreadCrumbs";
    export default {
        name: "BaseTable",
        components:{
            "search-form": SearchForm,
            "bread-crumbs": BreadCrumbs
        },
        props:{
            uri:{// 数据请求地址
                type: String,
                require: true
            },
            formSize:{
                type: String,
                require: false
            },
            operationButtonList:{// 操作按钮
                type: Array,
                require: false,
                default: []
            },
            tableColumnList:{// 表头
                type: Array,
                require: false,
                default: []
            },
            searchForm:{
                type:Array,
                default:[]
            },
            searchHandle:{
                type:Array,
                default:()=>[]
            },
            searchData:{
                type:Object,
                default:{}
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
                    pageSizeArr:[1, 10, 20, 30, 40],// 可选每页显示数据条数
                    pageSize: 1,// 当前每页显示条数
                    totalSize: 1// 总页数
                }
            };
        },
        methods:{
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
                the.$http.post(uri,{
                    currentPage: the.page.currentPage,
                    pageSize: the.page.pageSize,
                    params: the.searchData
                }).then(function (res) {
                    the.dataArr = res.data.content;
                    the.page.totalSize = res.data.totalPages;
                    the.page.currentPage = res.data.currentPage;
                    the.loading = false;
                });
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
