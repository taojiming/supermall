<template>
  <Swiper>
    <SwiperItem v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
  //引入轮播图
  import {Swiper, SwiperItem} from 'components/common/swiper/index';

  export default {
    name: "HomeSwiper",
    props:{
      banners:{
        type:Array,
        default() {
          return []
        }
      },
    data() {
        return {
          isLoad:false
        }
    }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      imageLoad() {
        //发送事件多次，仅需要一次，所以使用变量isLoad记录是否加载过的状态
        if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
