<template>
    <div class="userUpdate">
        <update-form labelWidth="80px"
                     v-if="toRender"
                     :formData="formData"
                     :formFieldList="formFieldList"
                     :size="formSize"
                     :buttonArr="btnHandle"></update-form>
    </div>
</template>

<script>
    import UpdateForm from "@/components/common/UpdateForm";
    import * as CommInterface from '@/components/utils/commInterface';
    import * as SystemConstant from '@/components/constant/systemConstant';
    import * as ComponentConstant from '@/components/constant/componentConstant';
    import * as BusinessConstant from '@/components/constant/businessConstant';
    import util from "@/components/utils/util";

    export default {
        name: "UserUpdate",
        components:{
            "update-form": UpdateForm
        },
        data(){
            return {
                formData:{
                    id: "",
                    name: "",
                    pass: ""
                },
                formFieldList:[
                    {
                        type: "Input",
                        label: "ID",
                        prop: "id",
                        width: "180px",
                        placeholder: "请输入ID...",
                        size: ""
                    },
                    {
                        type: "Input",
                        label: "姓名",
                        prop: "name",
                        width: "180px",
                        placeholder: "请输入姓名...",
                        size: ""
                    },
                    {
                        type: "Input",
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
                        label:"修改",
                        type:"primary",
                        size: "",
                        handle:()=>{
                            let the = this;
                            the.updateUser();
                        }
                    },
                    {
                        label:"重置",
                        type:"primary",
                        size: "",
                        handle:()=>{
                            let the = this;
                            the.formData.id = "";
                            the.formData.name = "";
                            the.formData.pass = "";
                        }
                    }
                ],
                toRender: false
            }
        },
        methods: {
            queryInfo(id){// 查询需回显的数据
                let the = this;
                CommInterface.baseSendGet(
                    SystemConstant.consUserManage.QUERY_USER_BY_ID,
                    {
                        id: id
                    },
                    the.dealRes
                );
            },
            dealRes(res){// 对回显数据预处理
                let the = this;
                the.formData = res;
                the.toRender = true;
            },
            updateUser(){// 修改用户
                let the = this;
                let user = JSON.parse(localStorage.getItem("user"));
                the.formData.updateUser = user.id;
                console.log("修改的数据", the.formData);
                CommInterface.sendPost(
                    SystemConstant.consUserManage.UPDATE_USER_BY_ID,
                    the.formData,
                    function (res) {
                        console.log("修改结果 ",res);
                        if(res>0){
                            util.showMsg("修改成功", ComponentConstant.MessageProperties.SUCCESS);
                            CommInterface.goToUserList();
                        } else {
                            util.showMsg("修改失败", ComponentConstant.MessageProperties.ERROR);
                        }

                    }
                );
            },

        },
        mounted() {
        },
        created() {
            let the = this;
            let id = the.$route.params.id;
            the.queryInfo(id);
        }
    }
</script>

<style scoped>

</style>
