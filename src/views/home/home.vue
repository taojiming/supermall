<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <tar-control
      :title="['流行','新款','精选']"
      class="tar-control"
      @tabClick="tabClick"
      ref="tabControl1" v-show="isTabFixed"/>
    <Scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3"
            :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view/>
      <tar-control
        :title="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </Scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  //小组件
  import HomeSwiper from "./homeChildComp/HomeSwiper"; //导入推荐
  import HomeRecommendView from "./homeChildComp/HomeRecommendView";//导入本周流行
  import FeatureView from "./homeChildComp/FeatureView";

  //公共的组件
  import NavBar from "components/common/navbar/NavBar";
  import TarControl from "components/content/tarControl/TarControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";
  import {debounce} from "common/ulits/debounce";
  import {itemListenerMixin} from 'common/mixin'

  //方法
  import {getHomeMultiData, getHomeGoods} from 'network/home';

  export default {
    name: "home",
    components: {
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      NavBar,
      TarControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins:[itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop:false,
        tarOffsetTop:0,
        isTabFixed:false,
        saveY:0,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    created() {
      //1.导入多个数据
      this.getHomeMultiData();
      //2.导入商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      //监听图片的事件 为防止this.$refs.scroll拿不到 于是放到mounted中
      //1.图片加载完成的事件监听
      // const refresh = debounce(this.$refs.scroll.refresh,50)
      // this.itemImgListener = () => {
      //   refresh()
      // }
      // this.$bus.$on('imgItemLoad',this.itemImgListener)

    },
    //离开组件时，组件会自动销毁
    destroyed() {
      console.log('---');
    },
    activated() {
      // console.log('activated');
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //1.离开时记录scroll滚动的y值
      this.saveY = this.$refs.scroll.getScrollY()
      //2.离开时停止事件总线
      this.$bus.$off('imgItemLoad',this.itemImgListener)
    },

    methods: {
      backClick() {
        this.$refs.scroll.scrollTo(0,0,500)
      },
      /*
      * 组件相关的方法
      * */
      tabClick(index) {
        switch (index) {
           case 0:
             this.currentType = 'pop';
             break
           case 1:
             this.currentType = 'new';
             break
          case 2:
             this.currentType = 'sell';
            break
        }
        //保持tabControl点击时一致
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
        // if (index == 0) {
        //   this.currentType = 'pop';
        // } else if (index == 1) {
        //   this.currentType = 'new';
        // } else if (index == 2) {
        //   this.currentType = 'sell';
        // }
      },
      contentScroll(position) {
        //1.判断BackTop是否显示
        this.isShowBackTop = -(position.y)>1000
        //2.决定tarControl是否吸顶(position:fixed)
        this.isTabFixed = -(position.y) > this.tarOffsetTop
      },
      loadMore() {
        // console.log('上拉加载更多');
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },
      swiperImageLoad() {
        //获取tabControl的offsetTop
        this.tarOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /*
      * 网络请求相关的方法
      * */
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          // console.log(res);
          // this.result = res;
          this.banners = res.data.banner.list;
          // console.log(res.data.banner.list);
          this.recommends = res.data.recommend.list;
          // console.log(res.data.recommend.list);
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .tar-control {
    position: relative;
    z-index: 9;
  }

  /*
    计算高度
    第一种方法：
      -calc(100% - 某值)
  */
  /*.content{*/
  /*  height:calc(100% - 93px);*/
  /*}*/

  /*
  动态绑定class fixed的方法不行
  */

  /*.fixed{*/
  /*  position: fixed;*/
  /*  top:44px;*/
  /*  right: 0;*/
  /*  left: 0;*/
  /*}*/
  /*
   第二种方法：
   */
  .content{
    position: absolute;
    top: 44px;
    bottom:49px;
    left: 0;
    right: 0;
  }
</style>
