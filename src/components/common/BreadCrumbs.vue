<template>
    <div class="breadcrumb">
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
				console.log(the.$route);
                let matched = the.$route.matched[1];
				// 为了兼容用户注册页面
				if(!matched){
					matched = the.$route.matched[0];
				}
                let meta = matched.meta;
                the.breadList = meta;
            }
        },
        mounted() {
            let the = this;
            the.getBreadctumb();
        }
    }
</script>

<style scoped>
	.breadcrumb{
		margin-bottom: 24px;
	}
</style>
