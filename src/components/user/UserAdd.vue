<template>
    <div>
        <update-form labelWidth="80px"
                     :formData="formData"
                     :formFieldList="formFieldList"
                     :size="formSize"
                     :buttonArr="btnHandle"></update-form>
    </div>
</template>

<script>
    import UpdateForm from "@/components/common/UpdateForm";
    import util from "@/components/utils/util";
    import * as CommInterface from '@/components/utils/commInterface';
    import * as businessConstant from '@/components/constant/businessConstant';
    import * as ComponentConstant from '@/components/constant/componentConstant';
    import * as SystemConstant from '@/components/constant/systemConstant';
	//let sexs = [{label:'男',value:'M'},{label:'女',value:'F'}];
	//let likeArr = [{label:'羽毛球',value:'badminton'},{label:'篮球',value:'basketball'}];
	//let interstProps = {label:'label',value:'value'};
	
    export default {
        name: "UserAdd",
        components:{
            "update-form": UpdateForm
        },
        data(){
            return {
                formData:{
                    id: "",
                    name: "",
                    pass: "",
					sex: "",
					likes:[],					
					brithDay: "",
					age: "",
					qq: "",
					weChat: "",
					email: "",
					education: ""
					
                },
                formFieldList:[
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
                    },
					{
					    type: "Radio",
					    label: "性别",
					    prop: "sex",
						radios: [],
					    size: "",
						change: function(v){
							console.log("您选择的是:",v);
						}
					},
					{
					    type: "Checkbox",
					    label: "爱好",
					    prop: "likes",
						checkboxs: [],
					    size: "",
						change: function(v){
							console.log("您选择的爱好是:",v);
						}
					},
					{
					    type: "Date",
					    label: "出生日期",
					    prop: "brithDay",
					    size: ""
					},
					{
					    type: "Number",
					    label: "年龄",
					    prop: "age",
					    width: "180px",
					    //stepStrictly: true,
						step: 2,
					    //controlsPosition: "right",
					    min: 1,
					    max: 100,
						change: function(v){
							console.log("当前值",v)
						}
					    
					},
					{
					    type: "Input",
					    label: "qq号",
					    prop: "qq",
					    width: "180px",
					    placeholder: "请输入qq号...",
					    size: ""
					},
					{
					    type: "Input",
					    label: "微信号",
					    prop: "weChat",
					    width: "180px",
					    placeholder: "请输入微信号...",
					    size: ""
					},
					{
					    type: "Input",
					    label: "电子邮件",
					    prop: "email",
					    width: "180px",
					    placeholder: "请输入电子邮件...",
					    size: ""
					},
					{
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
                ],
                formSize: "",
                btnHandle:[
                    {
                        label:"新增",
                        type:"primary",
                        size: "",
                        handle:()=>{
                            let the = this;
                            the.addUser();
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
                ]
            };
        },
        methods:{
            addUser(){
                let the = this;
                let user = JSON.parse(localStorage.getItem("user"));
                the.formData.createUser = user.id;
                console.log("新增的数据", the.formData);
                CommInterface.getUserById(
                    SystemConstant.consUserManage.ADD_USER,
                    the.formData,
                    function (res) {
                        console.log("新增结果 ",res);
                        if(res>0){
                            util.alert("新增成功, 用户号是: " + res, null, null, function(){
								CommInterface.goToUserList();
							});
                            
                        } else {
                            util.showMsg("新增失败", ComponentConstant.MessageProperties.ERROR);
                        }
                    }
                );
            },
			searchEduOptions(){//学历查询
				let the = this;
				CommInterface.getCodeType(
				    businessConstant.CODE_TYPE.EDUCATION,
				    function (res) {
				        console.log("学历备选项查询结果: ",res);
						let retCode = res.code;
						let retMsg = res.msg;
				        if(SystemConstant.common.RET_CODE == retCode){
				            the.formFieldList[9].options = res.data;
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
				    function (res) {
				        console.log("爱好备选项查询结果: ",res);
						let retCode = res.code;
						let retMsg = res.msg;
				        if(SystemConstant.common.RET_CODE == retCode){
				            the.formFieldList[3].checkboxs = res.data;
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
				    function (res) {
				        console.log("性别备选项查询结果: ",res);
						let retCode = res.code;
						let retMsg = res.msg;
				        if(SystemConstant.common.RET_CODE == retCode){
				            the.formFieldList[2].radios = res.data;
				        } else {
				            util.showMsg("性别备选项查询失败", ComponentConstant.MessageProperties.ERROR);
				        }
				    }
				);
			}
        },
        created() {
			
        },
        mounted() {
			let the = this;
			the.searchEduOptions();
			the.searchLikesOptions();
			the.searchSexOptions();
        }
    }
</script>

<style scoped>

</style>
