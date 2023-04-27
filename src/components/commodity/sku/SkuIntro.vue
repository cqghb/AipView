<template>
	<div>
		<el-form :model="introductionInformation" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
		  <div :key="domain.key" v-for="(domain, index) in introductionInformation.domains">
			  <el-form-item
			    :label="'属性名' + (index+1)"
			    :key="domain.key"
			    :prop="'domains.' + index + '.name'"
			    :rules="{
			      required: true, message: '属性名不能为空', trigger: 'blur'
			    }"
			  >
				<el-input v-model="domain.name"></el-input>
			  </el-form-item>
			  <el-form-item
			    :label="'属性值' + (index+1)"
			    :key="domain.key"
			    :prop="'domains.' + index + '.value'"
			    :rules="{
			      required: true, message: '属性值不能为空', trigger: 'blur'
			    }"
			  >
			    <el-input v-model="domain.value"></el-input>
				<el-button v-if="introductionInformation.domains.length==(index+1)" @click="addDomain">新增属性</el-button>
				<el-button v-if="1!=(index+1)" @click.prevent="removeDomain(domain)">删除</el-button>
			  </el-form-item>
		  </div>
		  <el-form-item>
		    <!-- <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button> -->
		    <!-- <el-button @click="addDomain">新增域名</el-button> -->
		    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default{
		name: "SkuIntro",
		components: {},
		data(){
			return {
				introductionInformation: {
				  domains: [{/* 商品重要属性 */
					name: "",/* 属性名 */
					value: "",/* 属性值 */
				  }]
				},
			};
		},
		methods:{
			resetForm(formName) {
				let _this = this;
				_this.$refs[formName].resetFields();
			},
			removeDomain(item) {
				let _this = this;
				var index = this.introductionInformation.domains.indexOf(item)
				if (index !== -1) {
				  _this.introductionInformation.domains.splice(index, 1)
				}	
			},
			addDomain() {
				let _this = this;
				_this.introductionInformation.domains.push({
				  value: "",
				  name: ""
				});
			}
		},
		created() {
			let _this = this;
		},
		mounted() {
			let _this = this;
		}
	}
</script>

<style>
</style>