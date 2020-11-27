<template>
    <div>
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
                           @click="">
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
    export default {
        name: "BaseTable",
        components:{
            "search-form": SearchForm
        },
        props:{
            uri:{// 数据请求地址
                type: String,
                require: true
            },
            queryFieldList:{// 查询字段
                type: Array,
                require: false,
                default: []
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
            }
        },
        data(){
            let sexs=[{label:'男',value:'M'},{label:'女',value:'F'}]
            let sexProps={label:'label',value:'value'}
            let intersts=[{label:'羽毛球',value:'badminton'},{label:'篮球',value:'basketball'}]
            let interstProps={label:'label',value:'value'}
            return {
                searchData:{
                    id: "",
                    name: ""
                },
                formSize: "",
                searchForm:[
                    {
                        type: "Input",
                        label: "ID",
                        prop: "id",
                        width: "180px",
                        placeholder: "请输入ID...",
                        size:""// size: medium / small / mini
                    },
                    {
                        type: "Input",
                        label: "姓名",
                        prop: "name",
                        width: "180px",
                        placeholder: "请输入姓名...",
                        size:""// size: medium / small / mini
                    },
                    // {
                    //     type: "Select",
                    //     label: "性别",
                    //     prop: "sex",
                    //     width: "180px",
                    //     options: sexs,
                    //     props: sexProps,
                    //     placeholder: "请选择性别...",
                    //     change:row=>{
                    //        console.log(row);
                    //     }
                    // }
                    // {type:'Checkbox',label:'爱好',width:'180px',prop:'interst',checkboxs:intersts,props:interstProps}
                ],
                searchHandle:[
                    {
                        label:"查询",
                        type:"primary",
                        size: "",
                        handle:()=>{
                            let the = this;
                            the.loading = true;
                            the.queryList();
                        }
                    },
                    {
                        label:"重置",
                        type:"primary",
                        size: "",
                        handle:()=>{
                            let the = this;
                            the.searchData.id= "";
                            the.searchData.name= "";
                        }
                    }
                ],
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
