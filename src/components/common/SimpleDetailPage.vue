<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20">
            <el-col :span="6">id:</el-col>
            <el-col :span="14">qwer</el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">id:</el-col>
            <el-col :span="14">qwer</el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">id:</el-col>
            <el-col :span="14">qwer</el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">id:</el-col>
            <el-col :span="14">qwer</el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="20">
                <el-button type="primary" @click="">返回</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "SimpleDetailPage",
        data(){
            return{

            }
        },
        methods:{

        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
