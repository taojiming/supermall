<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="item in cartList" :itemInfo="item"/>
    </scroll>
    <car-bottom-bar/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import scroll from 'components/common/scroll/Scroll'
  import CartListItem from "./CartListItem";
  import CarBottomBar from './carBottomBar'
  export default {
    name: "CartList",
    computed:{
      ...mapGetters(['cartList'])
    },
    components:{
      scroll,
      CartListItem,
      CarBottomBar
    }
  }
</script>

<style scoped>
  .content{
    position:absolute;
    top:44px;
    bottom:89px;
    left: 0;
    right:0;
    overflow: hidden;
  }
</style>
