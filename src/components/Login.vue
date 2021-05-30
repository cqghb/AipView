<template>

<!--    <div class="login">-->
        <el-card class="box-card">
            <base-form labelWidth="80px"
                         :formData="formData"
                         :formFieldList="formFieldList"
                         :size="formSize"
                         :buttonArr="btnHandle"></base-form>
        </el-card>

<!--    </div>-->

</template>

<script>
    // import UpdateForm from "@/components/common/UpdateForm";
    import * as CommInterface from '@/components/utils/commInterface';
    import BaseForm from "@/components/common/BaseForm";

    export default {
        name: "Login",
        components:{
            "base-form": BaseForm
        },
        data(){
            return {
                formData:{
                    id: "666666",
                    pass: "123456"
                },
                formFieldList:[
                    {
                        type: "Input",
                        label: "用户编号",
                        prop: "id",
                        width: "180px",
                        placeholder: "请输入用户编号...",
                        size: ""
                    },
                    {
                        type: "Password",
                        label: "密码",
                        prop: "pass",
                        width: "180px",
                        placeholder: "请输入密码...",
                        size: ""
                    }
                ],
                formSize: "",
                btnHandle:[
                    {
                        label:"登录",
                        type:"primary",
                        size: "",
                        handle:()=>{
                            let the = this;
                            the.login();
                        }
                    },
                    {
                        label:"重置",
                        type:"primary",
                        size: "",
                        handle:()=>{
                            let the = this;
                            the.formData.id = "";
                            the.formData.pass = "";
                        }
                    }
                ]
            }
        },
        methods:{
            login(){
                let the = this;
				console.log("登录信息",the.formData);
                the.$http.post("/login",{
                    id: the.formData.id,
                    pass: the.formData.pass
                }).then(function (res) {
                    console.log("登录用户信息: ",res);
                    // 把查得的用户
                    the.userName = res.data.name;
                    // 信息放入本地缓存中
                    localStorage.setItem("user",JSON.stringify(res.data));
                    return the.$router.push({ path: "/home" })
                })
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .box-card {
        position: relative;
        left: 33%;
        margin-top: 10%;
        width: 450px;
        height: auto;
    }
</style>
