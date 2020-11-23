<template>
    <div>
        <bread-crumbs></bread-crumbs>
        <div class="detail-body">
            <el-row class="ha-ha" :gutter="24" v-for="(item,index) in infoArr" v-bind:key="index">
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
            dataArr:{
                type: Array,
                require: true,
                default: []
            },
            id:{
                type: String
            },
            uri:{
                type: String
            }
        },
        data(){
            return{
                infoArr:[]
            }
        },
        methods:{
            back(){
                this.$router.go(-1);
            },
            queryInfo(id){
                let the = this;
                the.infoArr = the.dataArr;
                console.log("ths.id",the.infoArr);
                the.$http.post(the.uri, {
                    id: the.id
                }).then(function (res) {
                    let info = res.data;
                    for(let item in info){
                        for(let i=0;i< the.infoArr.length; i++){
                            let name = the.infoArr[i].name;
                            if(name==item){
                                the.infoArr[i].fieldValue = info[item];

                                break;
                            }
                        }

                    }

                    console.log("userInfo",the.infoArr);
                });
            },
        },
        created: function () {
            let the = this;
            console.log("dffdff",the.id)
            the.queryInfo(the.id);
        },
        mounted() {
            let the = this;
            // console.log("dffdff",the.id)
            // the.queryInfo(the.id);
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
