<template>
    <div>
        <el-form :inline="true" :model="user" class="demo-form-inline">
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
                <el-button icon="el-icon-search" type="primary" @click="queryUserList">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="userArr"
                border
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

                userArr:[],
                pageSize: 1,
                pageSizeArr:[1,10, 20, 30, 40],
                currentPage: 1,
                totalSize: 1
            }
        },methods:{
            hello(){
                alert("1");
            },
            handleSizeChange(val){
                let the = this;
                this.pageSize = val;
                the.queryUserList();
            },
            handleCurrentChange(val){
                let the = this;
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

</style>
