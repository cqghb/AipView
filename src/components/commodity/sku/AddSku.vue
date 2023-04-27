<template>
	<div>
		<el-divider content-position="left">商品基础信息配置(配置与商品价格直接相关的属性)</el-divider>
		<el-form :model="baseInfo" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
			<el-form-item label="名称" prop="name">
				<el-input v-model="baseInfo.name"></el-input>
			</el-form-item>
			<el-form-item label="所属SPU" prop="spuNo">
				<!-- <el-input v-model="baseInfo.spuId"></el-input> -->
				<el-select v-model="baseInfo.spuNo" filterable placeholder="请选择">
					<el-option v-for="item in spuIdOption" 
						:key="item.value" 
						:label="item.label" 
						:value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="数量" prop="number">
				<el-input v-model="baseInfo.number"></el-input>
				<!-- <el-input-number controls-position="right"
					:min="1"
					label="122"
					:model="baseInfo.number"></el-input-number> -->
			</el-form-item>
			<el-form-item label="价格" prop="price">
				<el-input v-model="baseInfo.price"></el-input>
				<!-- <el-input-number :precision="2" 
					controls-position="right"
					:min="0.01"
					label="12"
					:model="baseInfo.price"></el-input-number> -->
			</el-form-item>
			<el-divider content-position="left">商品介绍</el-divider>
			<div :key="domain.key" v-for="(domain, index) in baseInfo.domains">
				<el-form-item
				:label="'属性名' + (index+1)"
				:key="domain.key"
				:prop="'domains.' + index + '.name'"
				:rules="{
				  required: true, message: '域名不能为空', trigger: 'blur'
				}"
				>
					<el-input v-model="domain.name"></el-input>
				</el-form-item>
				<el-form-item
				:label="'属性值' + (index+1)"
				:key="domain.key"
				:prop="'domains.' + index + '.value'"
				:rules="{
				  required: true, message: '域名不能为空', trigger: 'blur'
				}"
				>
					<el-input v-model="domain.value"></el-input>
					<el-button v-if="baseInfo.domains.length==(index+1)" @click="addDomain">新增属性</el-button>
					<el-button v-if="1!=(index+1)" @click.prevent="removeDomain(domain)">删除</el-button>
				</el-form-item>
			</div>
			<el-divider content-position="left">规格与包装</el-divider>
			<template v-for="(item, index) in baseInfo.specificationPackage">
				<el-form-item :key="item.key" 
					:label="'规格组名称' + (index + 1)" 
					:prop="item.name">
					<el-input v-model="item.name"></el-input>
					<!-- 最后一个才显示新增按钮 -->
					<el-button v-if="baseInfo.specificationPackage.length==(index+1)" 
						@click="addSpePac">新增</el-button>
					<!-- 当只有一个时，不能删除 -->
					<el-button v-if="1!=(index+1)" 
						@click.prevent="removeSpePac(item)">删除</el-button>
				</el-form-item>
				<template v-for="(spec, sindex) in item.componentArr">
					<el-form-item :key="spec.key" 
						:label="'组件名' + (index + 1) + '-' + (sindex + 1)" 
						:prop="spec.name">
						<el-input v-model="spec.name"></el-input>
					</el-form-item>
					<el-form-item :key="spec.key" 
						:label="'组件值' + (index + 1) + '-' + (sindex + 1)" 
						:prop="spec.value">
						<el-input v-model="spec.value"></el-input>
						<!-- 最后一个才显示新增按钮 -->
						<el-button :key="spec.key" 
							v-if="item.componentArr.length  == (sindex + 1)" 
							@click="addComponent(index)">新增</el-button>
						<!-- 当只有一个时，不能删除 -->
						<el-button :key="spec.key" 
							v-if="1 != (sindex + 1)" 
							@click.prevent="removeComponent(index, spec)">删除</el-button>
					</el-form-item>
					
				</template>
				
			</template>
			
			<el-divider content-position="left">售后保障</el-divider>
			<el-form-item>
				<rich-text ref="child" :values="baseInfo.skuAfterSales.afterSales"/>
			</el-form-item>
			
			<el-form-item>
			<!-- <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button> -->
			<!-- <el-button @click="addDomain">新增域名</el-button> -->
			<el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
			<el-button @click="addSku('dynamicValidateForm')">提交</el-button>
			</el-form-item>
		</el-form>
		<el-divider content-position="left">上传商品图片</el-divider>
		<el-upload
		  action="http://localhost:8080/p/file/uploadFile"
		  ref="upload1"
		  name="files"
		  list-type="picture-card"
		  :data="{fileType: '1'}"
		  :on-error="uploadError"
		  :auto-upload="true">
		    <i slot="default" class="el-icon-plus"></i>
		    <div slot="file" slot-scope="{file}">
		      <img
		        class="el-upload-list__item-thumbnail"
		        :src="file.url" alt=""
		      >
		      <span class="el-upload-list__item-actions">
		        <span
		          class="el-upload-list__item-preview"
		          @click="handlePictureCardPreview(file)"
		        >
		          <i class="el-icon-zoom-in"></i>
		        </span>
		        <span
		          v-if="!disabled"
		          class="el-upload-list__item-delete"
		          @click="handleRemove(file)"
		        >
		          <i class="el-icon-delete"></i>
		        </span>
		      </span>
		    </div>
		</el-upload>
		<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">日志打印上传的文件信息</el-button>
		<el-dialog :visible.sync="dialogVisible">
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		
		
		
	</div>
</template>

<script>
	import UpdateForm from "@/components/common/UpdateForm";
	import RichText from "@/components/common/RichText";
	import util from "@/components/utils/util";
	import SkuIntro from "@/components/commodity/sku/SkuIntro";
	import SpecificationPackaging from "@/components/commodity/sku/SpecificationPackaging";
	import AfterSalesGuarantee from "@/components/commodity/sku/AfterSalesGuarantee";
	
	
	import * as CommInterface from '@/components/utils/commInterface';
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as MsgConstant from '@/components/constant/msgConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
		
	export default {
		name: "Add",
		components: {
			"update-form": UpdateForm,
			"sku-intro": SkuIntro,
			"specification-packaging": SpecificationPackaging,
			"after-sales-guarantee": AfterSalesGuarantee,
			"rich-text": RichText
		},
		data() {
			
			return {
				activeName: "first",
				baseInfo: {
					name: "",
					spuNo: "",
					number: "1",
					price: "0.01",
					skuAfterSales:{/* 上平售后 */
						afterSales: "123",
					},
					domains: [{/* 商品重要属性 */
						name: "",/* 属性名 */
						value: "",/* 属性值 */
						index: 1,/* 序号 */
					}],
					specificationPackage:[/* 商品规格组 */
						{
							name: "",/* 组名 */
							index: 1,/* 序号 */
							componentArr: [/* 零部件 */
								{
									name: "",/* 部件名 */
									value: "",/*, 部件值 */
									index: 1,/* 序号 */
								}
							]
						}
					],
					imageAddDtoList:[],/* 产品图像信息 */
				},
				dialogImageUrl: "",
				dialogVisible: false,
				disabled: false,
				fileList:[],
				spuIdOption: [],/* SPU下拉选项 */
			};
		},
		methods: {
			uploadError(err){/* 文件上传失败时的回调函数 */
				let _this = this;
				console.log("_this",_this);
				console.log("err",err);
				// console.log("file",file);
				// console.log("fileList",fileList);
				
			},
			selectSpuIdOption(){/* 查询SPU下拉选项 */
				let _this = this;
				CommInterface.sendPost(
				    "/spu/searchSpuCodeName",
				    {code: ""},
				    function (res) {
				        console.log("新增结果 ",res);
				        _this.spuIdOption = res;
				    }
				);
			},
			addComponent(index){/* 新增组件信息 */
				let _this = this;
				_this.baseInfo.specificationPackage[index].componentArr.push({
					name: "",/* 部件名 */
					value: ""/* 部件值 */
				});
			},
			removeComponent(i, compo){/* 移除组件信息 */
				let _this = this;
				let index = _this.baseInfo.specificationPackage[i].componentArr.indexOf(compo)
				if (index !== -1) {
					_this.baseInfo.specificationPackage[i].componentArr.splice(index, 1)
				}
			},
			addSpePac(){/* 新增规格组 */
				let _this = this;
				_this.baseInfo.specificationPackage.push({
					name: "",/* 组名 */
					componentArr: [/* 零部件 */
						{
							name: "",/* 部件名 */
							value: ""/* 部件值 */
						}
					]
				});
			},
			removeSpePac(spePac){/* 移除规格组 */
				let _this = this;
				let index = _this.baseInfo.specificationPackage.indexOf(spePac)
				if (index !== -1) {
					_this.baseInfo.specificationPackage.splice(index, 1)
				}
			},
			submitUpload(){
				console.log("11",this.$refs.upload1.uploadFiles);
			},
			handleRemove(file) {
				console.log("11",file);
				let index = this.$refs.upload1.uploadFiles.indexOf(file)
				if (index !== -1) {
				  this.$refs.upload1.uploadFiles.splice(index, 1)
				}
			},
			handlePictureCardPreview(file) {
				console.log("11",file);
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			addSku(formName){/* 添加商品 */
				let _this = this;
				let imageList = _this.$refs.upload1.uploadFiles;
				for(let i=0;i<imageList.length;i++){
					if("000000"==imageList[i].response.code){
						let item = {
							name: imageList[i].name,
							path: imageList[i].response.data
						};
						_this.baseInfo.imageAddDtoList.push(item);
					}
				}
				_this.$refs[formName].validate((valid) => {
					if (!valid) {
						console.log('error submit!!');
						return false;
					} else {
						console.log('验证通过',_this.baseInfo);
						CommInterface.sendPost(SystemConstant.consSkuManage.ADD, _this.baseInfo, function(r){
							if(r){
								util.showMsg(MsgConstant.msgCommon.SUCCESS_ADD, ComponentConstant.MessageProperties.SUCCESS);
								CommInterface.goToPage(SystemConstant.consComponentPath.LIST_SKU, SystemConstant.consComponentName.LIST_SKU, {});
							} else {
								util.showMsg(MsgConstant.msgCommon.FAIL_ADD, ComponentConstant.MessageProperties.ERROR);
							}
						});
					}
				});
			},
			resetForm(formName) {
				// console.log(this.$refs.child.getVal());
				console.log(this.baseInfo.afterSales);
				this.$refs[formName].resetFields();
			},
			removeDomain(item) {
				let index = this.baseInfo.domains.indexOf(item)
				if (index !== -1) {
					this.baseInfo.domains.splice(index, 1)
				}
			},
			addDomain() {
				this.baseInfo.domains.push({
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
			_this.selectSpuIdOption();
		}
	}
</script>

<style scoped="scoped">
	@import url("../../../../static/css/LeftRight.css");
</style>
