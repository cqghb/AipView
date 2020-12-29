<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  // import Top from '@/components/Top'
  // import Menu from '@/components/Menu'
  // import Footer from '@/components/Footer'
  export default {
    name: 'App',
    // components:{
    //   Top,
    //   Menu,
    //   Footer
    // }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

</style>
