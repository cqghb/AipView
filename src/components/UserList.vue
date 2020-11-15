<template>
    <div>
        <el-row class="row">
            <el-col :span="24">
                <el-form :inline="true" :model="user">
                    <el-form-item label="ID">
                        <el-input v-model="user.id"
                                  placeholder="请输入内容"
                                  prefix-icon="el-icon-search"
                                  maxlength="6"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="user.name"
                                  placeholder="请输入内容"
                                  prefix-icon="el-icon-search"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" type="primary" @click="query">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="24">
                <el-button type="primary" icon="el-icon-plus">新增</el-button>
                <el-button type="warning" icon="el-icon-edit">修改</el-button>
                <el-button type="danger" icon="el-icon-delete">删除</el-button>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="24">
                <el-table
                        :data="userArr"
                        border
                        v-loading="loading"
                        element-loading-text="数据加载中"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        style="width: 100%">
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
                            prop="createTime"
                            label="创建日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="pass"
                            label="密码"
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
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "UserList",
        data(){
            return{
                user:{
                    id:"",
                    name:"",
                },
                loading: true,

                userArr:[],
                pageSize: 1,
                pageSizeArr:[1,10, 20, 30, 40],
                currentPage: 1,
                totalSize: 1
            }
        },methods:{
            query(){
                let the = this;
                the.loading = true;
                the.queryUserList();
            },
            handleSizeChange(val){
                let the = this;
                the.loading = true;
                this.pageSize = val;
                the.queryUserList();
            },
            handleCurrentChange(val){
                let the = this;
                the.loading = true;
                this.currentPage = val;
                the.queryUserList();
            },
            queryUserList(){
                let the = this;
                the.$http.post("/findPage",{
                    currentPage: the.currentPage,
                    pageSize: the.pageSize,
                    params:{
                        id: the.user.id,
                        name: the.user.name
                    }
                }).then(function (res) {
                    console.log(res);
                    the.userArr = res.data.content;
                    the.totalSize = res.data.totalPages;
                    the.currentPage = res.data.currentPage;
                    the.loading = false;
                })
            }
        },
        mounted() {
            let the = this;
            the.queryUserList();
        }
    }
</script>

<style scoped>
    .row{
        margin-bottom: 8px;
    }
</style>
