<template>
    <div class="UpdateForm">
        <bread-crumbs></bread-crumbs>
        <base-form :formData="formData"
                   :formFieldList="formFieldList"
                   :size="size"
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
