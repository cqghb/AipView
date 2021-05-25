<template>
    <div>
        <el-form label-position="left" :label-width="labelWidth">
            <el-form-item 
						v-for="(item, index) in formFieldList"
						:key="index"
						:label="item.label">
                <!-- 输入框 -->
                <el-input 
						v-if="item.type==='Input'"
                        v-model="formData[item.prop]"
                        :size="item.size"
                        clearable></el-input>
                <!-- 下拉框 -->
                <el-select 
						v-if="item.type==='Select'"
						v-model="formData[item.prop]"
						:size="item.size"
						@change="item.change(formData[item.prop])">
					<!-- el-option 使用的是双向绑定来动态改变可选项 -->
                    <el-option 
							v-for="op in item.options"
							:label="op.label"
							:value="op.value"
							:key="op.value"></el-option>
                </el-select>
                <!-- 单选 -->
                <el-radio-group 
							v-if="item.type==='Radio'"
							v-model="formData[item.prop]"
							@change="item.change && item.change(formData[item.prop])">
                    <el-radio 
							v-for="ra in item.radios"
							:label="ra.value"
							:size="item.size"
							:key="ra.value">
                        {{ra.label}}
                    </el-radio>
                </el-radio-group>
                <!-- 单选按钮 -->
                <el-radio-group 
							v-if="item.type==='RadioButton'"
							v-model="formData[item.prop]"
							@change="item.change && item.change(formData[item.prop])">
                    <el-radio-button 
								v-for="ra in item.radios"
								:label="ra.value"
								:size="item.size"
								:key="ra.value">
                        {{ra.label}}
                    </el-radio-button>
                </el-radio-group>
                <!-- 复选框 -->
                <el-checkbox-group 
								v-if="item.type==='Checkbox'"
								v-model="formData[item.prop]"
								@change="item.change && item.change(formData[item.prop])">
                    <el-checkbox 
							v-for="ch in item.checkboxs"
							:label="ch.value"
							:size="item.size"
							:key="ch.value">
                        {{ch.label}}
                    </el-checkbox>
                </el-checkbox-group>
                <!-- 日期 -->
                <el-date-picker 
							v-if="item.type==='Date'"
							v-model="formData[item.prop]"
							:size="item.size"></el-date-picker>
                <!-- 时间 -->
                <el-time-select 
							v-if="item.type==='Time'"
							v-model="formData[item.prop]"
							:size="item.size"></el-time-select><!-- size medium / small / mini -->
                <!-- 日期时间 -->
                <el-date-picker 
							v-if="item.type==='DateTime'"
							type='datetime'
							v-model="formData[item.prop]"
							:size="item.size"
							:change="item.change && item.change(formData[item.prop])"
							:disabled="item.disable"></el-date-picker>
                <!-- 数字输入框 -->
                <el-input-number 
							v-if="item.type==='Number'"
							v-model="formData[item.prop]"
							:label="item.label"
							:min="item.min"
							:max="item.max"
							:value="item.value"
							@change="item.change && item.change(formData[item.prop])"
							:step="item.step"></el-input-number>
				<!-- 文件上传 -->
				<el-upload
						v-if="item.type==='Upload'"
						class="avatar-uploader"
						ref="upload"
						:action="item.action"
						:multiple="item.multiple"
						:data="item.data"
						:name="item.name"
						:show-file-list="item.showFileList"
						:on-preview="item.onPreview && item.onPreview"
						@on-remove="item.onRemove && item.onRemove"
						@on-success="item.onSuccess && item.onSuccess"
						@on-error="item.onErrors && item.onErrors"
						@on-progress="item.onProgress && item.onProgress"
						:on-change="item.onChange && item.onChange"
						@before-upload="item.beforeUpload && item.beforeUpload"
						@before-remove="item.beforeRemove && item.beforeRemove"
						:list-type="item.listType"
						:auto-upload="item.autoUpload"
						:disabled="item.disabled"
						:limit="item.limit"
						:on-exceed="item.onExceed && item.onExceed"
						>
						<!-- 文件类型是照片 照片预览 -->
						<div v-if="item.fileType=='1'">
							<!-- 只能传一张的 -->
							<div v-if="item.num==1">
								<img v-if="item.dialogImageUrl" :src="item.dialogImageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</div>
							<!-- 可以传多张 -->
							<div v-else>
								<i class="el-icon-plus"></i>
							</div>
							
						</div>
						<!-- 非照片的 文件预览-->
						<div v-else>
							<!-- 只能传一文件的 -->
							<div v-if="item.num==1">
								
							</div>
							<!-- 可以传多个文件的 -->
							<div v-else>
								<i class="el-icon-plus"></i>
							</div>
						</div>
						<div slot="tip" class="el-upload__tip">{{item.tip}}</div>
				</el-upload>
				<el-dialog v-if="item.fileType=='1' && item.num!=1" :visible.sync="item.dialogVisible">
					<img width="100%" :src="item.dialogImageUrl" alt="" />
				 </el-dialog>
            </el-form-item>
            <div class="updateFormBtn">
                <el-button v-for="item in buttonArr"
                           :type="item.type"
                           :size="item.size || size"
                           :key="item.label"
                           @click="item.handle()">
                    {{item.label}}
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "BaseFrom",
        props:{
            labelWidth:{// 名称长度
                type:String,
                default:'100px'
            },
            size:{// 表单项的长度
                type:String,
                require: false,
                default:""
            },
            formFieldList:{// 表单字段
                type:Array,
                default:[]
            },
            formData:{// 表单绑定对象
                type:Object,
                default:{}
            },
            buttonArr:{// 动作按钮
                type:Array,
                default:[]
            }
        },
        data(){
            return {
				dialogImageUrl: "",
				dialogVisible: false
            };
        },
        methods: {
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				let the = this;
				if (!isJPG) {
				  the.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
				  the.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
        },
        mounted() {
			let the = this;
			
        },
        created() {
        }
    }
</script>

<style scoped>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
		border-radius: 4px;
	}
</style>
