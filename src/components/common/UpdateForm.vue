<template>
    <div class="UpdateForm">
        <bread-crumbs v-if="crumbs"></bread-crumbs>
        <base-form 
					:formData="formData"
					ref="baseForm"
					:formFieldList="formFieldList"
					:size="size"
					:rules="rules"
					:labelWidth="labelWidth"
					:buttonArr="buttonArr"></base-form>
    </div>
</template>

<script>
    import BreadCrumbs from "@/components/common/BreadCrumbs";
    import BaseForm from "@/components/common/BaseForm";
	import util from "@/components/utils/util";
	
	import * as CommInterface from '@/components/utils/commInterface';
	import * as SystemConstant from '@/components/constant/systemConstant';
	import * as ComponentConstant from '@/components/constant/componentConstant';
	
    export default {
        name: "UpdateForm",
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
                type: Object,
                default:()=>{}
            },
            formData:{// 表单绑定对象
                type:Object,
                default: ()=>{}
            },
            buttonArr:{// 动作按钮
                type:Array,
                default: ()=>[]
            },
			rules:{// 表单验证规则
				type:Object,
				require: false,
				default: ()=>{}
			},
			// baseFromModel:{// 表单绑定对象
			// 	type:Object,
			// 	default: ()=>{}
			// },
			crumbs:{// 是否显示面包屑
				type: Boolean,
				require: false,
				default: true
			}
        },
        components:{
            "bread-crumbs": BreadCrumbs,
            "base-form": BaseForm
        },
        data(){
            return {

            };
        },
        methods: {
			searchCode(codeType, paramArr, errorMsg, callback){
				CommInterface.getCodeType(codeType,paramArr,
				    function (res) {
				        console.log("菜单默认选中备选项查询结果: ",res);
						let retCode = res.code;
						let retMsg = res.msg;
				        if(SystemConstant.common.RET_CODE == retCode){
				            return callback(res.data);
				        } else {
				            util.showMsg(errorMsg, ComponentConstant.MessageProperties.ERROR);
				        }
				    }
				);
			},
			// searchDelTagOptions(){
			// 	let _this = this;
			// 	let delTagOption = util.searchDelTagOptions();
			// 	_this.$emit("searchDelTagOptions", delTagOption);
			// },
        },
        mounted() {
			let _this = this;
			// _this.searchDelTagOptions();
        },
        created() {
        }
    }
</script>

<style scoped>
.updateFormBtn{
    text-align: center;
}
</style>
