<template>
    <div>
        <!-- 条件查询 -->
        <!--<el-row class="row">
            <el-col :span="24">
                <el-form :inline="true" :model="params">
                    <el-form-item label="ID">
                        <el-input v-model="params.id"
                                  placeholder="请输入内容"
                                  prefix-icon="el-icon-search"
                                  maxlength="6"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="params.name"
                                  placeholder="请输入内容"
                                  prefix-icon="el-icon-search"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" type="primary" @click="query">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>-->
        <!-- 操作区 -->
        <!--<el-row class="row">
            <el-col :span="24">
                <el-button icon="el-icon-more" @click="showUserInfo">详情</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="shouwWinAddUser">新增</el-button>
                <el-button type="warning" icon="el-icon-edit">修改</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteUser">删除</el-button>

            </el-col>
        </el-row>-->
        <!-- 列表 -->
        <!--<el-row class="row">
            <el-col :span="24">
                <el-table
                        :data="userArr"
                        ref="multipleTable"
                        @row-click="handelClickRow"
                        border
                        v-loading="loading"
                        element-loading-text="数据加载中"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        @selection-change="handleSelectionChange"
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="id"
                            label="ID"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="pass"
                            label="密码"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="createUser"
                            label="创建人"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="创建日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="updateUser"
                            label="修改人">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="修改时间"
                            width="180">
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-sizes="pageSizeArr"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalSize">
                </el-pagination>
            </el-col>
        </el-row>-->
        <!--
        // demo 留着不删
        <el-button type="danger" icon="el-icon-delete" @click="detailDemo">详情页测试</el-button>
        <router-view></router-view>-->
        <base-table uri="/findPage"
                    :queryFieldList="queryFieldList"
                    :operationButtonList="operationButtonList"
                    :tableColumnList="tableColumnList"></base-table>
    </div>
</template>

<script>
    import SimpleDetailWin from "@/components/common/SimpleDetailWin";
    import BaseTable from "@/components/common/BaseTable";

    export default {
        name: "UserList",
        components:{
            "simple-detail-win": SimpleDetailWin,
            "base-table": BaseTable,
        },
        data(){
            return{
                queryFieldList:[
                    { name: "id", label: "ID", placeholder: "请输入ID", prefixIcon: "el-icon-search", maxlength: 6},
                    { name: "name", label: "姓名", placeholder: "请输入姓名", prefixIcon: "el-icon-search", maxlength: 20}
                ],
                operationButtonList:[
                    { type: "", icon: "el-icon-more", text: "详情"},
                    { type: "primary", icon: "el-icon-plus", text: "新增"},
                    { type: "warning", icon: "el-icon-edit", text: "修改"},
                    { type: "danger", icon: "el-icon-delet", text: "删除"},
                ],
                tableColumnList:[
                    { prop: "id", label: "ID", width: 180 },
                    { prop: "name", label: "姓名", width: 180 },
                    { prop: "pass", label: "密码", width: 180 },
                    { prop: "createUser", label: "创建人", width: 180 },
                    { prop: "createTime", label: "创建时间", width: 180 },
                    { prop: "updateUser", label: "修改人", width: 180 },
                    { prop: "updateTime", label: "修改时间", width: 180 }
                ]
                // params:{
                //     id:"",
                //     name:"",
                // },
                // dataArr:[
                //     { name: "id", fieldName: "ID", value: "" },
                //     { name: "name", fieldName: "姓名", value: "" },
                //     { name: "pass", fieldName: "密码", value: "" },
                //     { name: "createUser", fieldName: "创建人", value: "" },
                //     { name: "createTime", fieldName: "创建时间", value: "" },
                //     { name: "updateUser", fieldName: "修改人", value: "" },
                //     { name: "updateTime", fieldName: "修改时间", value: "" }
                // ],
                // loading: true,// 表格加载效果
                // selectedArr: [],// 选中的数据
                // user:{},
                // userArr:[],
                // pageSize: 1,
                // pageSizeArr:[1,10, 20, 30, 40],
                // currentPage: 1,
                // totalSize: 1
            }
        },methods:{
            // query(){// 条件查询
            //     let the = this;
            //     the.loading = true;
            //     the.queryUserList();
            // },
            // handleSizeChange(val){// 每页显示数据条数变化触发函数
            //     let the = this;
            //     the.loading = true;
            //     this.pageSize = val;
            //     the.queryUserList();
            // },
            // handleCurrentChange(val){// 当前页发生变化触发函数
            //     let the = this;
            //     the.loading = true;
            //     this.currentPage = val;
            //     the.queryUserList();
            // },
            // handelClickRow(row){
            //     let the = this;
            //     the.$refs.multipleTable.toggleRowSelection(row);
            // },
            addUser(){
                let the = this;
                // let createUser = JSON.parse(localStorage.getItem("user")).id;
                // the.$http.post("/insertUser",{
                //     id: the.user.id,
                //     name: the.user.name,
                //     pass: the.user.pass,
                //     createUser: createUser
                // }).then(function (res) {
                //     console.log(res);
                //     the.winShow = false;
                //     // 添加成功刷新表格数据
                //     the.loading = true;
                //     the.queryUserList();
                //
                // });

            },
            // queryUserList(){// 获取用户列表
            //     let the = this;
            //     the.$http.post("/findPage",{
            //         currentPage: the.currentPage,
            //         pageSize: the.pageSize,
            //         params:{
            //             id: the.params.id,
            //             name: the.params.name
            //         }
            //     }).then(function (res) {
            //         the.userArr = res.data.content;
            //         the.totalSize = res.data.totalPages;
            //         the.currentPage = res.data.currentPage;
            //         the.loading = false;
            //     });
            // },
            // detailDemo(){// demo 留着不删
            //     let the = this;
            //     return the.$router.push({ path: "/simpleDetailPage" });
            // },
            showUserInfo(){// 显示用户详细信息
                let the = this;
                // the.commonCheck();
                // let params = the.selectedArr[0];
                // let id = params.id;
                // return the.$router.push({
                //     path: "/userDetail",
                //     query: {
                //         id: id
                //     }
                // });
            },
            updateWinShow(val){
                let the = this;
                // the.winShow = val;
                // the.dataArr = [];

            },
            shouwWinAddUser(){// 打开新增用户的窗口
                let the = this;
                // the.winTitle = "新增用户";
                // the.winShow = true;
                // the.readonly = false;
            },
            handleSelectionChange(val){
                let the = this;
                // the.selectedArr = val;

            },
            deleteUser(){// 删除用户
                let the = this;
                the.commonCheck();
                // let id = the.selectedArr[0].id;
                // if(id){
                //     the.$http.post("/deleteUser",{
                //         id: id
                //     }).then(function (res) {
                //         // 删除成功刷新表格数据
                //         the.loading = true;
                //         the.queryUserList();
                //     });
                // }

            },
            commonCheck(){// 公共检查
                let the = this;
                let num = the.selectedArr.length;
                if(num==0){
                    the.showMsg("请选择一条数据");
                    return false;
                }
                if(num>1){
                    the.showMsg("请不要多选");
                    return false;
                }
            },
            showMsg(msg){// 警告消息
                let the = this;
                the.$message({
                    showClose: true,
                    center: true,
                    message: msg,
                    type: 'warning'
                });
            }
        },
        mounted() {
            let the = this;
            // the.queryUserList();
        }
    }
</script>

<style scoped>

</style>
