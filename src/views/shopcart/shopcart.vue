<template>
  <div class="shopCart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import {mapGetters} from 'vuex'
  export default {
    name: "shopcart",
    components:{
      NavBar,
      CartList,
    },
    computed:{
      // cartLength() {
      //   return this.$store.getters.cartLength
      // }
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color:#fff;
    font-weight: 700;
  }
</style>
