<template>
    <div>
        <!-- 操作区 -->
        <!--<el-row class="row">
            <el-col :span="24">
                <el-button icon="el-icon-more" @click="showUserInfo">详情</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="shouwWinAddUser">新增</el-button>
                <el-button type="warning" icon="el-icon-edit">修改</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteUser">删除</el-button>

            </el-col>
        </el-row>-->
        <!--
        // demo 留着不删
        <el-button type="danger" icon="el-icon-delete" @click="detailDemo">详情页测试</el-button>
        <router-view></router-view>-->
        <base-table uri="/findPage"
                    ref="userTable"
                    :operationButtonList="operationButtonList"
                    :tableColumnList="tableColumnList"
                    :searchData="searchData"
                    :searchForm="searchForm"
                    :formSize="formSize"
                    :searchHandle="searchHandle"></base-table>
    </div>
</template>

<script>
    import SimpleDetailWin from "@/components/common/SimpleDetailWin";
    import BaseTable from "@/components/common/BaseTable";
    import util from "@/components/utils/util";

    export default {
        name: "UserList",
        components:{
            "simple-detail-win": SimpleDetailWin,
            "base-table": BaseTable,
        },
        data(){
            let sexs=[{label:'男',value:'M'},{label:'女',value:'F'}]
            let sexProps={label:'label',value:'value'}
            let intersts=[{label:'羽毛球',value:'badminton'},{label:'篮球',value:'basketball'}]
            let interstProps={label:'label',value:'value'}
            return{
                searchData:{
                    id: "",
                    name: ""
                },
                searchForm:[
                    {
                        type: "Input",
                        label: "ID",
                        prop: "id",
                        width: "180px",
                        placeholder: "请输入ID...",
                        size:""
                    },
                    {
                        type: "Input",
                        label: "姓名",
                        prop: "name",
                        width: "180px",
                        placeholder: "请输入姓名...",
                        size:""
                    },
                    // {
                    //     type: "Select",
                    //     label: "性别",
                    //     prop: "sex",
                    //     width: "180px",
                    //     options: sexs,
                    //     props: sexProps,
                    //     placeholder: "请选择性别...",
                    //     change:row=>{
                    //        console.log(row);
                    //     }
                    // }
                    // {type:'Checkbox',label:'爱好',width:'180px',prop:'interst',checkboxs:intersts,props:interstProps}
                ],
                searchHandle:[
                    {
                        label:"查询",
                        type:"primary",
                        size: "",
                        handle:()=>{
                            let the = this;
                            the.loading = true;
                            the.$refs.userTable.queryList();// 调子组件的方法
                        }
                    },
                    {
                        label:"重置",
                        type:"primary",
                        size: "",
                        handle:()=>{
                            let the = this;
                            the.searchData.id= "";
                            the.searchData.name= "";
                        }
                    }
                ],
                formSize: "",
                operationButtonList:[
                    {
                        type: "",
                        icon: "el-icon-more",
                        text: "详情",
                        handle:()=>{
                            let the = this;
                            the.showUserInfo();
                        }
                    },
                    {
                        type: "primary",
                        icon: "el-icon-plus",
                        text: "新增",
                        handle:()=>{
                            let the = this;
                        }
                    },
                    {
                        type: "warning",
                        icon: "el-icon-edit",
                        text: "修改",
                        handle:()=>{
                            let the = this;
                            the.updateWinShow();
                        }
                    },
                    {
                        type: "danger",
                        icon: "el-icon-delet",
                        text: "删除",
                        handle:()=>{
                            let the = this;
                        }
                    },
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
            }
        },
        methods:{
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
            showUserInfo(){// 显示用户详细信息
                let the = this;
                the.commonCheck();
                let params = the.$refs.userTable.selectedDataArr[0];
                let id = params.id;
                return the.$router.push({
                    path: "/userDetail",
                    name: "UserDetail",
                    params: {
                        id: id,
                        id2: "1",
                        id3: "2"
                    }
                });
            },
            updateWinShow(){
                let the = this;
                the.commonCheck();
                let params = the.$refs.userTable.selectedDataArr[0];
                let id = params.id;
                return the.$router.push({
                    path: "/userUpdate",
                    name: "UserUpdate",
                    params: {
                        id: id
                    }
                });

            },
            dleSelectionChange(val){
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
                let num = the.$refs.userTable.selectedDataArr.length;
                if(num==0){
                    util.showMsg("请选择一条数据");
                    return false;
                }
                if(num>1){
                    util.showMsg("请不要多选");
                    return false;
                }
            }
        },
        mounted() {
            let the = this;

        }
    }
</script>

<style scoped>

</style>
