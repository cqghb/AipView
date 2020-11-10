<template>
    <div>
        <el-menu-item v-if="itemData.childrenList.length==0" :index="itemData.uri" :key="itemData.id">
            <span>{{itemData.name}}</span>
        </el-menu-item>

        <el-submenu v-if="itemData.childrenList.length>0" :index="itemData.id" :key="itemData.id">
            <template slot="title">
                <i :class="itemData.icon"></i>
                <span>{{itemData.name}}</span>
            </template>
            <!--调用组件自身，循环itemData的childrenList，实现递归 -->
            <child-menu v-for="item in itemData.childrenList" :item-data="item" :key="item.id"></child-menu>
        </el-submenu>
    </div>
</template>

<script>
    export default {
        name: "child-menu",
        props: ['itemData'],
        template: '#main-template'
    }
</script>

<style scoped>

</style>
