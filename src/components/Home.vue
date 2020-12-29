<template>
    <div id="home">
        <el-container style=" border: 1px solid #eee">
            <el-aside width="250px">
                <Menu></Menu>
            </el-aside>
            <el-container>
                <el-header>
                    <Top></Top>
                </el-header>
                <el-main>
                    <router-view/>
                </el-main>
                <el-footer>
                    <Footer></Footer>
                </el-footer>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    import Top from '@/components/Top'
    import Menu from '@/components/Menu'
    import Footer from '@/components/Footer'
    export default {
        name: "Home",
        components:{
            Top,
            Menu,
            Footer
        }
    }
</script>

<style scoped>

</style>
