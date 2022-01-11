<template>
	<div class="teee">
		<el-aside width="250px" style="height:100%;background-color: rgb(238, 241, 246)">
		    <el-menu :default-openeds="defaultSelect" router>
		        <childMenu :key="item.id" v-for="item in menuTree" :item-data="item"></childMenu>
		    </el-menu>
		</el-aside>
	</div>
    
</template>

<script>
    import childMenu from '@/components/ChildMenu'
	import * as SystemConstant from '@/components/constant/systemConstant';
	
    export default {
        name: "Menu",
        components:{
            childMenu
        },
        data(){
            return {
                defaultSelect: [],
                menuTree: []
            }
        },
        methods:{
            hello(){
                alert("1");
            }
        },
        mounted() {
            let the = this;
            the.$http.get(SystemConstant.consMenuManage.QUERY_MENU).then(function (res) {
                console.log(res);
                the.defaultSelect = res.data.defaultSelectList;
                the.menuTree = res.data.rootTree;

            })
        }
    }
</script>

<style scoped>
    .el-aside {
        color: #333;
    }
	.teee{
		
	}
</style>
