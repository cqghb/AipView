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
    import * as ComponentConstant from '@/components/constant/componentConstant';
    import * as SystemConstant from '@/components/constant/systemConstant';
	let sexs=[{label:'男',value:'M'},{label:'女',value:'F'}];
	let likeArr=[{label:'羽毛球',value:'badminton'},{label:'篮球',value:'basketball'}];
	let interstProps={label:'label',value:'value'};
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
					age: ""
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
                    },
					{
					    type: "Radio",
					    label: "性别",
					    prop: "sex",
						radios: sexs,
					    size: "",
						change: function(v){
							console.log("您选择的是:",v);
						}
					},
					{
					    type: "Checkbox",
					    label: "爱好",
					    prop: "likes",
						checkboxs: likeArr,
						props: interstProps,
					    size: ""
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
                            util.showMsg("新增成功", ComponentConstant.MessageProperties.SUCCESS);
                            CommInterface.goToUserList();
                        } else {
                            util.showMsg("新增失败", ComponentConstant.MessageProperties.ERROR);
                        }
                    }
                );
            }
        },
        created() {
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
