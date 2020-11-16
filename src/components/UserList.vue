<template>
    <div>
        <!-- 条件哈讯 -->
        <el-row class="row">
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
        </el-row>
        <!-- 操作区 -->
        <el-row class="row">
            <el-col :span="24">
                <el-button icon="el-icon-more" @click="showUserInfo">详情</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="addUser">新增</el-button>
                <el-button type="warning" icon="el-icon-edit">修改</el-button>
                <el-button type="danger" icon="el-icon-delete">删除</el-button>
            </el-col>
        </el-row>
        <!-- 列表 -->
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
        </el-row>
        <!-- 对话框 -->
        <el-dialog :title="winTitle" :visible.sync="winShow">
            <el-form ref="user" :model="user" label-width="80px">
                <el-form-item label="ID">
                    <el-input v-model="user.id"
                              clearable
                              :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="user.name"
                              clearable
                              :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="user.pass"
                              clearable
                              :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="创建人">
                    <el-input v-model="user.createUser"
                              clearable
                              :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="创建人">
                    <el-input v-model="user.createUser"
                              clearable
                              :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker
                            v-model="user.createTime"
                            type="datetime"
                            :readonly="readonly"
                            clearable
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="修改人">
                    <el-input v-model="user.updateUser"
                              clearable
                              :readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="修改时间">
                    <el-date-picker
                            v-model="user.updateTime"
                            type="datetime"
                            :readonly="readonly"
                            clearable
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button v-if="winTitle!='用户详情'" @click="winShow = false">取 消</el-button>
                <el-button type="primary" @click="winShow = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UserList",
        data(){
            return{
                params:{
                    id:"",
                    name:"",
                },
                loading: true,
                winShow: false,
                winTitle: "用户详情",
                readonly: true,
                user:{},
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
                        id: the.params.id,
                        name: the.params.name
                    }
                }).then(function (res) {
                    console.log(res);
                    the.userArr = res.data.content;
                    the.totalSize = res.data.totalPages;
                    the.currentPage = res.data.currentPage;
                    the.loading = false;
                })
            },
            showUserInfo(){
                let the = this;
                the.winTitle = "用户详情";
                the.winShow = true;
            },
            addUser(){
                let the = this;
                the.winTitle = "新增用户";
                the.winShow = true;
                the.readonly = false;
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
