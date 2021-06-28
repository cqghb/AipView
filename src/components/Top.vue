<template>
    <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
				<i class="el-icon-setting el-icon--right"></i>
				<span>{{ userName }}</span>
			</span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="">查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
                <el-dropdown-item command="signOut">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        
    </el-header>
</template>

<script>
	import * as commInterface from '@/components/utils/commInterface';
	import * as systemConstant from '@/components/constant/systemConstant';
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
            },
			handleCommand(command){
				if("signOut"==command){// 退出系统
					commInterface.sendPost(
						systemConstant.consUserManage.SIGN_OUT,
						null,
						function(res){
							commInterface.goToLogin();
						}
					);
					
				}
			}
        },
        mounted() {
            var the = this;
            let user = JSON.parse(localStorage.getItem("user"));
            the.userName = user.name;
            // the.$http.post("/login",{
            //     name: "组件",
            //     pass: "123456"
            // }).then(function (res) {
            //     console.log("登录用户信息: ",res);
            //     // 把查得的用户
            //     the.userName = res.data.name;
            //     // 信息放入本地缓存中
            //     localStorage.setItem("user",JSON.stringify(res.data));
            // })
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
