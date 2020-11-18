<template>
    <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span>{{ userName }}</span>
    </el-header>
</template>

<script>
    export default {
        name: "Top",
        data(){
            return {
                userName: ""
            }
        },
        methods:{
            hello(){
                alert("1");
            }
        },
        mounted() {
            var the = this;
            the.$http.post("/login",{
                id: "666666",
                pass: "123456"
            }).then(function (res) {
                console.log(res);
                the.userName = res.data.name;
                // 把查得的用户信息放入本地缓存中
                localStorage.setItem("user",JSON.stringify(res.data));

            })
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
</style>
