<template>
	<div>
		<bread-crumbs></bread-crumbs>
		<base-form labelWidth="130px" 
			ref="passReset" 
			:formData="formData" 
			:baseFromModel="formData"
			:formFieldList="formFieldList" 
			:size="formSize" 
			:rules="rules" 
			:buttonArr="btnHandle"></base-form>
	</div>

</template>

<script>
	import BreadCrumbs from "@/components/common/BreadCrumbs";
	import * as CommInterface from '@/components/utils/commInterface';
	import * as formCheckUtil from '@/components/utils/form-check-util';
	import BaseForm from "@/components/common/BaseForm";
	import util from "@/components/utils/util";
	import * as ComponentConstant from '@/components/constant/componentConstant';
	
	export default {
		name: "PasswordReset",
		components: {
			"bread-crumbs": BreadCrumbs,
			"base-form": BaseForm
		},
		data() {
			let validatePass = (rule, value, callback) => {
				let the = this;
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					// if (the.formData.pass !== '') {
					// 	the.$refs.passReset.$refs.defaultMyForm.validateField('pass');
					// }
					callback();
				}
			};
			let validatePass2 = (rule, value, callback) => {
				let the = this;
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== the.formData.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				formData: {
					id: "",
					phoneEmail: "",
					pass: "",
					pass2: ""
				},
				formFieldList: [{
						type: "Input",
						label: "用户编号",
						prop: "id",
						width: "180px",
						placeholder: "请输入用户编号...",
						size: ""
					},
					{
						type: "Input",
						label: "手机号/电子邮件",
						prop: "phoneEmail",
						width: "180px",
						placeholder: "请输入手机号或者电子邮件...",
						size: ""
					},
					{
						type: "Password",
						label: "新密码",
						prop: "pass",
						width: "180px",
						placeholder: "请输入新密码...",
						size: ""
					}, {
						type: "Password",
						label: "确认密码",
						prop: "pass2",
						width: "180px",
						placeholder: "请再次输入新密码...",
						size: ""
					}
				],
				rules: {
					id: [{
						required: true,
						message: '请输入用户编号',
						trigger: 'blur'
					}],
					phoneEmail: [{
						required: false,
						message: '请输入用户编号',
						trigger: 'blur'
					}],
					pass: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 8,
							message: '长度在 6 到 8 个字符',
							trigger: 'blur'
						},
						{
							validator: validatePass,
							trigger: 'blur'
						}
					],
					pass2: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							validator: validatePass2,
							trigger: 'blur'
						}
					]
				},
				formSize: "",
				btnHandle: [{
						label: "修改密码",
						type: "primary",
						size: "",
						handle: () => {
							let the = this;
							the.resetPass();
						}
					}

				]
			}
		},
		methods: {
			resetPass(){// 修改密码
				let the = this;
				the.$refs.passReset.$refs.defaultMyForm.validate((valid)=>{
					if(valid){
						console.log("the.formData===",the.formData);
						CommInterface.resetPass(
							the.formData,
							function (res) {
							    console.log("密码修改结果: ",res);
							    if(res>0){
							        util.alert("密码修改成功!", null, null, function(){
										// 使用这种方式返回，是为了简荣芳用户注册后返回登录页面
										the.$router.go(-1);
									});
							    } else {
							        util.showMsg("密码修改失败!", ComponentConstant.MessageProperties.ERROR);
							    }
							}
						);
					}
				});
			}
		},
		mounted() {

		}
	};
</script>

<style>
</style>
