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
					searchFormRef="searchUserForm"
                    :searchHandle="searchHandle"></base-table>
    </div>
</template>

<script>
    import SimpleDetailWin from "@/components/common/SimpleDetailWin";
    import BaseTable from "@/components/common/BaseTable";
    import util from "@/components/utils/util";
    import * as CommInterface from '@/components/utils/commInterface';
    import * as ComponentConstant from '@/components/constant/componentConstant';
	import * as SystemConstant from '@/components/constant/systemConstant';

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
                searchForm:{
                    id: {
                        type: "Input",
                        label: "ID",
                        prop: "id",
                        width: "180px",
                        placeholder: "请输入ID...",
                        size:""
                    },
                    name: {
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
                },
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
                            the.addUser();
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
                            util.confirm("", "", "", "", "",function () {// 确认
                                the.deleteUser();
                            },null);

                        }
                    },
                ],
                tableColumnList:[
                    { prop: "id", label: "ID", width: 180 },
                    { prop: "name", label: "姓名", width: 180 },
                    { prop: "pass", label: "密码", width: 180 },
                    { prop: "createUser", label: "创建人", width: 180 },
                    // { prop: "createTime", label: "创建时间", width: 180, type:"Date" },
                    { prop: "createTime", label: "创建时间", width: 180, type:SystemConstant.dataType.DATE, formatDate: SystemConstant.common.FORMAT_DATE },
                    { prop: "updateUser", label: "修改人", width: 180 },
                    { prop: "updateTime", label: "修改时间", width: 180, type:SystemConstant.dataType.DATE, formatDate:SystemConstant.common.FORMAT_DATE }
                ]
            }
        },
        methods:{
            addUser(){
                let the = this;
                CommInterface.goToUserAdd();
            },
            showUserInfo(){// 显示用户详细信息
                let the = this;
                the.$refs.userTable.commonCheck();
                if(the.$refs.userTable.selectedData){
                    let params = the.$refs.userTable.selectedDataArr[0];
                    let id = params.id;
                    CommInterface.goToUserDetail(id);
                }

            },
            updateWinShow(){
                let the = this;
                the.$refs.userTable.commonCheck();
                if(the.$refs.userTable.selectedData){
					let params = the.$refs.userTable.selectedDataArr[0];
					let id = params.id;
					return the.$router.push({
					    path: "/userUpdate",
					    name: "UserUpdate",
					    params: {
					        id: id
					    }
					});
				}
            },
            dleSelectionChange(val){
                let the = this;
                // the.selectedArr = val;

            },
            deleteUser(){// 删除用户
                let the = this;
                the.$refs.userTable.commonCheck();
                if(the.$refs.userTable.selectedData){
					let params = the.$refs.userTable.selectedDataArr[0];
					let id = params.id;
					if(id){
					    the.$http.post("/deleteUser",{
					        id: id
					    }).then(function (res) {
					        console.log("jjjjjj", res);
					        if(res.data > 0){
					            util.showMsg("删除成功", ComponentConstant.MessageProperties.SUCCESS);
					            // 删除成功刷新表格数据
					            the.$refs.userTable.loading = true;
					            the.$refs.userTable.queryList();
					        } else {
					            util.showMsg("删除失败", ComponentConstant.MessageProperties.ERROR);
					        }
					
					    });
					}
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
