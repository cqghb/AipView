<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in breadList"
                                :key="index"
                                :to="{path: item.path}">
                {{ item.name }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "BreadCrumbs",
        data(){
            return {
                breadList:[]//路由集合
            };
        },
        methods:{
            getBreadctumb(){
                let the = this;
                let matched = the.$route.matched[1].meta;
                the.breadList = matched;
            }
        },
        mounted() {
            let the = this;
            the.getBreadctumb();
        }
    }
</script>

<style scoped>

</style>
