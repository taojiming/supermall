<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imgLoad">
    <div class="goods-info">
    <p>{{goodsitem.title}}</p>
    <span class="price">{{goodsitem.price}}</span>
    <span class="collect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodListItem",
    props:{
      goodsitem:{
        type:Object,
        default() {
          return {}
        }
      }
    },
    computed:{
      showImage() {
        return this.goodsitem.image || this.goodsitem.show.img
      }
    },
    methods:{
      imgLoad() {
        //imgItemLoad会向Home发送事件，但是在Detail中是不应该发送给Home，而是发送给Detail，要想imgItemLoad可以向Detail发送事件，有两种办法
        //第一种：根据路由是什么，发送什么，两个路由，两个不同的发送事件
        // if(this.$route.path.indexOf('home')){
        //   this.$bus.$emit('homeItemLoad')
        // }else if(this.$route.path.indexOf('detail')){
        //   this.$bus.$emit('detailItemLoad')
        // }

        //第二种：
        this.$bus.$emit('imgItemLoad')

      },
      itemClick() {
        //传入参数有两种方式
        this.$router.push('/detail/'+ this.goodsitem.iid)
        // this.$router.push({
        //   path:'/detail/',
        //   query:{
        //     iid:this.goodsitem.iid
        //   }
        // })
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width:48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
