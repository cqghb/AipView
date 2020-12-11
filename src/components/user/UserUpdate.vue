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
                            console.log("保存数据",the.formData);
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
            queryInfo(id){
                let the = this;
                CommInterface.getUserById(
                    SystemConstant.consUserManage.QUERY_USER_BY_ID,
                    {
                        id: id
                    },
                    the.dealRes
                );
            },
            dealRes(res){
                let the = this;
                the.formData = res;
                the.toRender = true;
            }
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
