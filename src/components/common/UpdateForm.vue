<template>
    <div class="UpdateForm">
        <bread-crumbs></bread-crumbs>
        <base-form 
					:formData="formData"
					ref="baseForm"
					:formFieldList="formFieldList"
					:baseFromModel="baseFromModel"
					:size="size"
					:rules="rules"
					:buttonArr="buttonArr"></base-form>
    </div>
</template>

<script>
    import BreadCrumbs from "@/components/common/BreadCrumbs";
    import BaseForm from "@/components/common/BaseForm";
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
                default:{}
            },
            buttonArr:{// 动作按钮
                type:Array,
                default:[]
            },
			rules:{// 表单验证规则
				type:Object,
				require: false,
				default: ()=>{}
			},
			baseFromModel:{// 表单绑定对象
				type:Object,
				default: ()=>{}
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

        },
        mounted() {
			console.log('userbase-mounted')
        },
        created() {
			console.log('userbase-createdd')
			console.log('formFieldList',this.formFieldList);
        }
    }
</script>

<style scoped>
.updateFormBtn{
    text-align: center;
}
</style>
