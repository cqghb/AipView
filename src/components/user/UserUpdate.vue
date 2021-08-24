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
	import * as businessConstant from '@/components/constant/businessConstant';

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
                    sex: "",
                    likes:[1],
                    birthday: "",
                    age: "",
                    qq: "",
                    weChat: "",
                    email: "",
                    education: ""
                },
                formFieldList:{
                    id: {
                        type: "Input",
                        label: "ID",
                        prop: "id",
                        width: "180px",
                        placeholder: "请输入ID...",
                        size: ""
                    },
                    name: {
                        type: "Input",
                        label: "姓名",
                        prop: "name",
                        width: "180px",
                        placeholder: "请输入姓名...",
                        size: ""
                    },
                    sex: {
                        type: "Radio",
                        label: "性别",
                        prop: "sex",
                    	radios: [],
                        size: "",
                    	change: function(v){
                    		console.log("您选择的是:",v);
                    	}
                    },
                    likes: {
                        type: "Checkbox",
                        label: "爱好",
                        prop: "likes",
                    	checkboxs: [],
                        size: "",
                    	change: function(v){
                    		console.log("您选择的爱好是:",v);
                    	}
                    },
                    birthday: {
                        type: "Date",
                        label: "出生日期",
                        prop: "birthday",
                        size: ""
                    },
                    age:{
                        type: "Number",
                        label: "年龄",
                        prop: "age",
                        width: "180px",
                    	step: 2,
                        min: 1,
                        max: 100,
                    	change: function(v){
                    		console.log("当前值",v)
                    	}
                        
                    },
                    qq:{
                        type: "Input",
                        label: "qq号",
                        prop: "qq",
                        width: "180px",
                        placeholder: "请输入qq号...",
                        size: ""
                    },
                    weChat: {
                        type: "Input",
                        label: "微信号",
                        prop: "weChat",
                        width: "180px",
                        placeholder: "请输入微信号...",
                        size: ""
                    },
                    email: {
                        type: "Input",
                        label: "电子邮件",
                        prop: "email",
                        width: "180px",
                        placeholder: "请输入电子邮件...",
                        size: ""
                    },
                    education: {
                        type: "Select",
                        label: "学历",
                        prop: "education",
                        width: "180px",
                    	options: [],
                        size: "",
                    	change: function(v){
                    		console.log("当前值",v);
                    	}
                    }
                },
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
                CommInterface.sendPost(
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
			searchEduOptions(){//学历查询
				let the = this;
				CommInterface.getCodeType(
				    businessConstant.CODE_TYPE.EDUCATION,
					[],
				    function (res) {
				        console.log("学历备选项查询结果: ",res);
						let retCode = res.code;
						let retMsg = res.msg;
				        if(SystemConstant.common.RET_CODE == retCode){
				            the.formFieldList.education.options = res.data;
				        } else {
				            util.showMsg("学历备选项查询失败", ComponentConstant.MessageProperties.ERROR);
				        }
				    }
				);
			},
			searchLikesOptions(){// 查询爱好
				let the = this;
				CommInterface.getCodeType(
				    businessConstant.CODE_TYPE.LIKES,
					[],
				    function (res) {
				        console.log("爱好备选项查询结果: ",res);
						let retCode = res.code;
						let retMsg = res.msg;
				        if(SystemConstant.common.RET_CODE == retCode){
				            the.formFieldList.likes.checkboxs = res.data;
				        } else {
				            util.showMsg("爱好备选项查询失败", ComponentConstant.MessageProperties.ERROR);
				        }
				    }
				);
			},
			searchSexOptions(){// 查询性别
				let the = this;
				CommInterface.getCodeType(
				    businessConstant.CODE_TYPE.SEX,
					[],
				    function (res) {
				        console.log("性别备选项查询结果: ",res);
						let retCode = res.code;
						let retMsg = res.msg;
				        if(SystemConstant.common.RET_CODE == retCode){
				            the.formFieldList.sex.radios = res.data;
				        } else {
				            util.showMsg("性别备选项查询失败", ComponentConstant.MessageProperties.ERROR);
				        }
				    }
				);
			}
        },
        mounted() {
        },
        created() {
            let the = this;
            let id = the.$route.params.id;
            the.queryInfo(id);
			the.searchEduOptions();
			the.searchLikesOptions();
			the.searchSexOptions();
        }
    }
</script>

<style scoped>

</style>
