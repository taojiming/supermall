<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <MainTarBar></MainTarBar>
  </div>
</template>
<script>
import MainTarBar from './components/content/tarbar/MainTarBar'
export default {
  name: 'App',
  components:{
    MainTarBar
  }
}

</script>
<style>
  @import "assets/css/base.css";
</style>
