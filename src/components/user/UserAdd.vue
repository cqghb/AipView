<template>
    <div>
        <update-form
					labelWidth="80px"
					ref="updateForm"
                    :formData="formData"
                    :formFieldList="formFieldList"
					:baseFromModel="formData"
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
			let self = this;
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
				headPortraitUrl: "",// 头像地址
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
                        type: "Password",
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
						step: 2,
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
					},
					{
					    type: "Upload",
					    label: "头像",
					    action: "http://localhost:8080/p/file/uploadFile",
					    multiple: false,
						data: {
							fileType: "1"// 表示上传的是头像
						},
						fileType: "1",// 上传文件类型 1标识图片，2标识文件
						num: 1,// 表示此控件可以上传文件的个数
						name: "files",
					    showFileList: false,
						// 此处是单文件上传不会触发次时间
						// onPreview: function(file){// 点击文件列表中已上传的文件时的钩子
						// 	let the = this;
						// 	console.log("点击文件列表中已上传的文件时的钩子",file);
						// 	
						// },
						// onRemove: function(file, fileList){// 文件列表移除文件时的钩子
						// 	let the = this;
						// 	console.log("文件列表移除文件时的钩子");
						// },
						onSuccess: function(res, file, fileList){// 文件上传成功时的钩子
							let the = this;
							console.log("文件上传成功时的钩子",res);
							self.headPortraitUrl = res.data;
							console.log("headPortraitUrl=",self.headPortraitUrl);
							self.addUser();
						},
						onErrors: function(err, file, fileList){// 文件上传失败时的钩子
							let the = this;
							console.log("文件上传失败时的钩子",err);
						},
						onChange: function(file, fileList){// 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
							let the = this;
							console.log("文件状态改变时的钩子1", file);
							console.log("文件状态改变时的钩子2", fileList);
							console.log("aaa", the);
							self.onPreview(file);
						},
						beforeUpload: function(file){// 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
							let the = this;
							console.log("上传文件之前的钩子");
						},
						beforeRemove: function(file, fileLis){// 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
							let the = this;
							console.log("删除文件之前的钩子");
						},
						listType: "picture-card",
						autoUpload: false,
						disabled: false,
						// limit: 1,
						onExceed: function(files, fileList){// 文件超出个数限制时的钩子
							let the = this;
							console.log("文件超出个数限制时的钩子",files);
							console.log("文件超出个数限制时的钩子",fileList);
						},
						dialogImageUrl: '',
						dialogVisible: false,
						tip: "只能上传jpg/png文件，且不超过500kb"
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
							self.$refs.updateForm.$refs.baseForm.$refs.upload[0].submit();
                            //the.addUser();
                        }
                    },
                    {
                        label:"重置",
                        type:"primary",
                        size: "",
                        handle:()=>{
                            let the = this;
                            the.$refs.updateForm.$refs.baseForm.$refs.defaultMyForm.resetFields();
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
                the.formData.headPortraitUrl = the.headPortraitUrl;
                console.log("新增的数据", the.formData);
                CommInterface.getUserById(
                    SystemConstant.consUserManage.ADD_USER,
                    the.formData,
                    function (res) {
                        console.log("新增结果 ",res);
                        if(res>0){
                            util.alert("新增成功, 用户号是: " + res, null, null, function(){
								// 使用这种方式返回，是为了简荣芳用户注册后返回登录页面
								the.$router.go(-1);
								//CommInterface.goToUserList();
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
			},
			onPreview(file){
				let the = this;
				the.formFieldList[10].dialogImageUrl = file.url;
				the.formFieldList[10].dialogVisible = true;
				
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
