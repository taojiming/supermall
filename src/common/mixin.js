import {debounce} from './ulits/debounce'
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener:null
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh,50)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('imgItemLoad',this.itemImgListener)
  }
}

import BackTop from "components/content/backTop/BackTop";
export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop:false,
    }
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
  }
}
