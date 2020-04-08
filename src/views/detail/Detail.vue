<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addCart1"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";
  //商品的信息
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  //店铺的信息
  import DetailShopInfo from "./childComps/DetailShopInfo";
  //detail商品详情数据展示
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  //params参数展示
  import DetailParamInfo from "./childComps/DetailParamInfo";
  //评论的信息
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  //底部工具栏
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import Scroll from "components/common/scroll/Scroll";
  //recommends的信息
  import {debounce} from 'common/ulits/debounce'
  import GoodsList from "components/content/goods/GoodsList";
  import {itemListenerMixin, backTopMixin} from 'common/mixin';
  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      DetailBottomBar,
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      //1.获取商品的iid
      this.iid = this.$route.params.iid
      //2.获取商品topImages的数据
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages
        //3.获取商品的信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //4.获取店铺的信息
        this.shop = new Shop(data.shopInfo)
        //5.获取detailInfo的信息
        this.detailInfo = data.detailInfo
        //6.获取GoodsParam的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //7.获取commentInfo的信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        this.getThemeTopY = debounce(() => {
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          console.log(this.themeTopYs);
        }, 200)
      })
      //3.获取推荐的数据
      getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.list
      })
    },
    destroyed() {
      this.$bus.$off('imgItemLoad', this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']),

      imageLoad() {
        //重新计算scrollHeight
        this.$refs.scroll.refresh()

        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        const positionY = -position.y
        for (let i = 0; i < this.themeTopYs.length; i++) {
          if (this.currentIndex !== i && (i < this.themeTopYs.length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
            || i === this.themeTopYs.length - 1 && positionY >= this.themeTopYs[i]) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
          //判断是否回到顶部
          this.isShowBackTop = positionY > 1000
        }
      },
      addCart1() {
        const product = {}
        //1.获取购物车需要展示的信息
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.oldPrice
        product.iid = this.iid
        //2.将商品添加到购物车里
        this.addCart(product).then(res => {
          this.$toast.show(res,2000)
          // console.log(this.$toast);
          // console.log(this.$toast.show);
        })
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px)
  }
</style>
