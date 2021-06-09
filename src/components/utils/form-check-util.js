// 表单验证工具类
export function validatePass(rule, value, callback) {
	let the = this;
	console.log("rule=",rule);
	if (value === '') {
		callback(new Error('请输入密码'));
	} else {
		if (the.formData.pass !== '') {
			the.$refs.passReset.$refs.defaultMyForm.validateField('pass');
		}
		callback();
	}
};
export function validatePass2(rule, value, callback) {
	let the = this;
	if (value === '') {
		callback(new Error('请再次输入密码'));
	} else if (value !== the.formData.pass) {
		callback(new Error('两次输入密码不一致!'));
	} else {
		callback();
	}
};
