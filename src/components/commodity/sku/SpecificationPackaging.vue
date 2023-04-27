<template>
	<div>
		<el-form :model="specificationPackage" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
		  <div :key="domain.key" v-for="(domain, index) in specificationPackage">
			  <el-form-item
			    :label="'规格组名' + (index+1)"
			    :key="domain.key"
			    :prop="'domains.' + index + '.specificationName'"
			    :rules="{
			      required: true, message: '规格组名不能为空', trigger: 'blur'
			    }"
			  >
				<el-input v-model="specificationName"></el-input>
				<el-button v-if="specificationPackage.length==(index+1)" @click="addDomain">新增组</el-button>
				<el-button v-if="1!=(index+1)" @click.prevent="removeDomain(domain)">删除</el-button>
			  </el-form-item>
			  <div :key="domain2.key" v-for="(domain2, index2) in domain.componentArr">
			  	<el-form-item
			  	  :label="'名' + (index2+1)"
			  	  :key="domain2.key"
			  	  :prop="'domains2.' + index2 + '.compName'"
			  	  :rules="{
			  	    required: true, message: '属性值不能为空', trigger: 'blur'
			  	  }"
			  	>
			  		<el-input v-model="compName"></el-input>
			  	</el-form-item>
			  	<el-form-item
			  	  :label="'值' + (index2+1)"
			  	  :key="domain2.key"
			  	  :prop="'domains2.' + index2 + '.compValue'"
			  	  :rules="{
			  	    required: true, message: '属性值不能为空', trigger: 'blur'
			  	  }"
			  	>
			  		<el-input v-model="compValue"></el-input>
					<el-button v-if="domain.componentArr.length==(index2+1)" @click="addDomain2">新增</el-button>
					<el-button v-if="1!=(index2+1)" @click.prevent="removeDomain2(domain2)">删除</el-button>
			  	</el-form-item>
				
			  </div>	
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
		name: "SpecificationPackaging",
		components: {},
		data(){
			return {
				specificationPackage:[/* 商品规格组 */
					{
						specificationName: "",/* 组名 */
						componentArr: [/* 零部件 */
							{
								compName: "",/* 部件名 */
								compValue: ""/* 部件值 */
							}
						]
					}
				]
			};
		},
		methods:{
			resetForm(formName) {
				let _this = this;
				// _this.$refs[formName].resetFields();
			},
			removeDomain(item) {
				let _this = this;
				// var index = this.introductionInformation.domains.indexOf(item)
				// if (index !== -1) {
				//   _this.introductionInformation.domains.splice(index, 1)
				// }	
			},
			addDomain() {
				let _this = this;
				// _this.introductionInformation.domains.push({
				//   value: "",
				//   name: ""
				// });
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