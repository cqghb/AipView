<template xmlns="http://www.w3.org/1999/html">
    <div>
        <el-dialog :title="winTitle"
                   :close-on-click-modal="clickModal"
                   :before-close="clickHandle"
                   :visible.sync="winShow"
                   :destroy-on-close="true"
                   center>
            <el-row  :gutter="20" v-for="item in dataArr" v-bind:key="item.id">
                <el-col :span="6">
                    {{ item.fieldName }}:
                </el-col>
                <el-col :span="18">
                    {{ item.fieldValue }}
                </el-col>
            </el-row>
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
            },
            url:{
                type: String,
                require: true
            },
            queryParam:{
                type: Object,
                require: true
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

            },
            queryInfo(){
                let the = this;
                the.$http.post("/queryUserById", {
                    id: the.queryParam.id
                }).then(function (res) {
                    console.log(res);
                    // for(let item in params){
                    //     for(let i=0;i< the.dataArr.length; i++){
                    //         let name = the.dataArr[i].name;
                    //         if(name==item){
                    //             the.dataArr[i].value = params[item];
                    //             break;
                    //         }
                    //     }
                    //
                    // }
                });
            }
        },
        mounted() {
            let the = this;
            the.queryInfo();
        }

    }
</script>

<style scoped>

</style>
