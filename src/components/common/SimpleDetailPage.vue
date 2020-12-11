<template>
    <div>
        <bread-crumbs></bread-crumbs>
        <div class="detail-body">
            <el-row class="ha-ha" :gutter="24" v-for="(item,index) in fieldList" v-bind:key="index">
                <el-col :span="3" :offset="9">{{ item.fieldName }}:</el-col>
                <el-col :span="12">{{ item.fieldValue }}</el-col>
            </el-row>
            <el-row class="ha-ha" :gutter="24">
                <el-col :offset="10" :span="14">
                    <el-button type="primary" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import BreadCrumbs from "@/components/common/BreadCrumbs";
    export default {
        name: "SimpleDetailPage",
        components:{
            "bread-crumbs": BreadCrumbs
        },
        props:{
            fieldList:{
                type: Array,
                require: true,
                default: []
            },
            info:{
                type:Object,
                default:{}
            }
        },
        data(){
            return{
                fieldListTem:[],
            }
        },
        methods:{
            back(){
                this.$router.go(-1);
            },
            dealDate(){
                let the = this;
                the.fieldListTem = the.fieldList;
                for(let item in the.info){
                    for(let i=0;i< the.fieldListTem.length; i++){
                        let name = the.fieldListTem[i].name;
                        if(name==item){
                            the.fieldListTem[i].fieldValue = the.info[item];
                            break;
                        }
                    }
                }
            }
        },
        created: function () {

        },
        mounted() {
            let the = this;
            the.dealDate();
        },
        watch:{
            // "fieldListTem": {
            //     handler(val, oldVal) {
            //         console.log("val", val)
            //         console.log("oldVal", oldVal)
            //
            //     },
            //     deep: true
            // }
        }
    }
</script>

<style scoped>
    .detail-body{
        /*text-align:center;*/
        border: 1px solid #EBEEF5;
        margin: 10px 0px;
        padding: 10px 10px;
    }
    .ha-ha {
        line-height: 36px;
    }
</style>
