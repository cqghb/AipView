<template>
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
</template>

<script>
    export default {
        name: "UserList",
        data(){
            return{
                userArr:[]
            }
        },methods:{
            hello(){
                alert("1");
            }
        },
        mounted() {
            let the = this;
            the.$http.post("/findPage",{
                pageNum: 0,
                pageSize: 10,
                params:{
                    id: "666666"
                }
            }).then(function (res) {
                console.log(res);
                the.userArr = res.data.content;

            })
        }
    }
</script>

<style scoped>

</style>
