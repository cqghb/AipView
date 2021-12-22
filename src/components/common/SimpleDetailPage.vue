<template>
    <div>
        <bread-crumbs></bread-crumbs>
        <div class="detail-body">
            <el-row class="ha-ha" :gutter="24" v-for="(item,index) in fieldList" v-bind:key="index">
                <el-col :span="3" :offset="9">{{ item.fieldName }}:</el-col>
                <!-- <el-col :span="12">{{ item.fieldValue | dataFormatFilter(item.type)}}</el-col> -->
				<el-col :span="12" v-if="'image'==item.type">
					<el-image 
					    style="width: 100px; height: 100px"
					    :src="item.fieldValue">
							<div slot="placeholder" class="image-slot">
								加载中 <span class="dot">...</span>
							</div>
							<div slot="error" class="image-slot">
								<i class="el-icon-picture-outline">图片加载失败</i>
							</div>
					</el-image>
				</el-col>
				<el-col v-else-if="'array'==item.type">
					<el-row :gutter="24">
						<el-col :span="12" :offset="12" v-for="(item2,index2) in item.fieldValue" v-bind:key="index2">
							<div class="grid-content bg-purple">{{ item2 }}</div>
						</el-col>
						
					  <!-- <el-col :span="6" v-for="items in item.fieldValue">
						  <div class="grid-content bg-purple">{{ items }}</div>
					  </el-col> -->
					  
					</el-row>
				</el-col>
				<el-col :span="12" v-else-if="item.showIcon">
					<!-- 用法参考菜单详情页 -->
					<i :class="item.fieldValue"></i>
					{{ item.fieldValue }}
				</el-col>
				<el-col :span="12" v-else>{{ item.fieldValue | dataFormatFilter(item.type, item.name, item.format)}}</el-col>
				
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
	import * as CommInterface from '@/components/utils/commInterface';
	
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
							let trans = the.fieldListTem[i].transformation;
							let code1 = the.info[item];
							
							if(trans){
								let type = the.fieldListTem[i].type;
								let params = [];
								if('text'==type){// 单个码
									params.push(code1);
								} else if('array'==type){
									params = code1;
								}
								
								// 需要转换的
								CommInterface.getCodeType(trans, params, function(res){
									let codeArr = res.data;
									let newValue = "";
									if('text'==type){// 单个码转换
										for(let n=0; n<codeArr.length; n++){
											let code = codeArr[n].value;
											let name = codeArr[n].label;
											if(code1==code){
												newValue = name;
												break;
											}
										}
										newValue = newValue ? newValue : code1;
										the.fieldListTem[i].fieldValue = newValue;
									} else if('array'==type){// 多个码需要转换
										console.log('eeeee',codeArr);
										let listTemp = [];
										for(let n=0; n<codeArr.length; n++){
											listTemp.push(codeArr[n].label);
										}
										the.fieldListTem[i].fieldValue = listTemp;
									}
									
								});
							} else {
								// 不需要转换的
								the.fieldListTem[i].fieldValue = code1;
							}
                            
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
	.bg-purple {
	    background: #d3dce6;
    }
	.grid-content {
	    border-radius: 4px;
	    min-height: 36px;
	}
</style>
