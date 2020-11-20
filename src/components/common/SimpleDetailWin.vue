<template>
    <div>
        <el-dialog :title="winTitle"
                   :close-on-click-modal="clickModal"
                   :before-close="clickHandle"
                   :visible.sync="winShow"
                   :destroy-on-close="true"
                   center>
            <el-row :gutter="20" v-for="item in dataArr" v-bind:key="item.id">
                <el-col :span="6">{{ item.fieldName }}:</el-col>
                <el-col :span="18">{{ item.fieldValue }}</el-col>
            </el-row>
<!--            <el-form ref="user" :model="user" label-width="80px">-->
<!--                <el-form-item label="ID">-->
<!--                    <el-input v-model="user.id"-->
<!--                              clearable-->
<!--                              :readonly="readonly"></el-input>-->
<!--                </el-form-item>-->
<!--                -->
<!--                <el-form-item label="创建时间">-->
<!--                    <el-date-picker-->
<!--                            v-model="user.createTime"-->
<!--                            type="datetime"-->
<!--                            :readonly="readonly"-->
<!--                            clearable-->
<!--                            placeholder="选择日期时间">-->
<!--                    </el-date-picker>-->
<!--                </el-form-item>-->

<!--            </el-form>-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="clickHandle">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "SimpleDetailWin",
        props:{
            winTitle: {
                type: String,
                require: true,
                default: "详情窗口"
            },// 窗口标题
            winShow: {
                type: Boolean,
                default: false
            },// 窗口是否显示
            clickModal: {
                type: Boolean,
                default: false
            },// 点击遮罩层是否能关闭窗口
            dataArr:{
                type: Array,
                require: true,
                default: []
            }
        },
        data(){
            return {

            };
        },
        methods: {
            clickHandle(){// 修改父组件传过来的winShow属性值
                let the = this;
                the.$emit("closeWin", false);

            }
        },
        mounted() {

        }

    }
</script>

<style scoped>

</style>
