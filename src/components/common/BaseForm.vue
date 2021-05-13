<template>
    <div>
        <el-form label-position="left" :label-width="labelWidth">
            <el-form-item v-for="(item, index) in formFieldList"
                          :key="index"
                          :label="item.label">
                <!-- 输入框 -->
                <el-input v-if="item.type==='Input'"
                          v-model="formData[item.prop]"
                          :size="item.size"
                          clearable></el-input>
                <!-- 下拉框 -->
                <el-select v-if="item.type==='Select'"
                           v-model="formData[item.prop]"
                           :size="item.size"
                           @change="item.change(formData[item.prop])">
					<!-- el-option 使用的是双向绑定来动态改变可选项 -->
                    <el-option v-for="op in item.options"
                               :label="op.label"
                               :value="op.value"
                               :key="op.value"></el-option>
                </el-select>
                <!-- 单选 -->
                <el-radio-group v-if="item.type==='Radio'"
                                v-model="formData[item.prop]"
                                @change="item.change && item.change(formData[item.prop])">
                    <el-radio v-for="ra in item.radios"
                              :label="ra.value"
                              :size="item.size"
                              :key="ra.value">
                        {{ra.label}}
                    </el-radio>
                </el-radio-group>
                <!-- 单选按钮 -->
                <el-radio-group v-if="item.type==='RadioButton'"
                                v-model="formData[item.prop]"
                                @change="item.change && item.change(formData[item.prop])">
                    <el-radio-button v-for="ra in item.radios"
                                     :label="ra.value"
                                     :size="item.size"
                                     :key="ra.value">
                        {{ra.label}}
                    </el-radio-button>
                </el-radio-group>
                <!-- 复选框 -->
                <el-checkbox-group v-if="item.type==='Checkbox'"
                                   v-model="formData[item.prop]"
								   @change="item.change && item.change(formData[item.prop])">
                    <el-checkbox v-for="ch in item.checkboxs"
                                 :label="ch.value"
                                 :size="item.size"
                                 :key="ch.value">
                        {{ch.label}}
                    </el-checkbox>
                </el-checkbox-group>
                <!-- 日期 -->
                <el-date-picker v-if="item.type==='Date'"
                                v-model="formData[item.prop]"
                                :size="item.size"></el-date-picker>
                <!-- 时间 -->
                <el-time-select v-if="item.type==='Time'"
                                v-model="formData[item.prop]"
                                :size="item.size"></el-time-select><!-- size medium / small / mini -->
                <!-- 日期时间 -->
                <el-date-picker v-if="item.type==='DateTime'"
                                type='datetime'
                                v-model="formData[item.prop]"
                                :size="item.size"
                                :disabled="item.disable && item.disable(formData[item.prop])"></el-date-picker>
                <!-- 数字输入框 -->
                <el-input-number v-if="item.type==='Number'"
                                 v-model="formData[item.prop]"
                                 :label="item.label"
                                 :min="item.min"
                                 :max="item.max"
                                 :value="item.value"
                                 @change="item.change && item.change(formData[item.prop])"
                                 :step="item.step"></el-input-number>
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

            };
        },
        methods: {

        },
        mounted() {
			let the = this;
			
        },
        created() {
        }
    }
</script>

<style scoped>

</style>
