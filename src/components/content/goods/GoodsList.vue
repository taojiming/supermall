<template>
  <div class="goods-list">
    <good-list-item v-for="item in goods" :goodsitem="item"/>
  </div>
</template>

<script>
  import GoodListItem from "./GoodListItem";

  export default {
    name: "GoodsList",
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodListItem
    },

  }
</script>

<style scoped>
  .goods-list {
    display: flex;
    /*包裹*/
    flex-wrap: wrap;
    /*均等分裂*/
    justify-content: space-around;
    padding: 2px
  }
</style>
