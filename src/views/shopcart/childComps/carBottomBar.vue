<template>
  <div class="bottom-bar">
    <div class="bottom-bar-left">
      <CheckButton class="check-button"
                   :is-active="isSelectAll" @click.native="checkClick"></CheckButton>
      <span>全选</span>
    </div>
    <div class="bottom-bar-center">
      合计：{{totalPrice}}
    </div>
    <div class="bottom-bar-right" @click="calcClick">
      去计算({{totalCount}})
    </div>
  </div>
</template>

<script>
  import CheckButton  from 'components/common/checkButton/CheckButton'
  export default {
    name: "carBottomBar",
    components:{
      CheckButton
    },
    computed:{
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item)=> {
          return preValue + item.price * item.count
          // console.log(item.price);
          // console.log(item.count);
          // console.log(typeof parseFloat(item.price));
          // console.log(typeof item.count);
          // console.log(typeof item.price* item.count);
        },0)
      },
      totalCount() {
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).length
      },
      isSelectAll() {
        if(this.$store.state.cartList.length === 0) return false
        return !this.$store.state.cartList.find(item => !item.checked)
      }
    },
    methods:{
      checkClick() {
        if(this.isSelectAll){
          //如果全部选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else{
          //如果部分选中或全部没有选中
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if(!this.isSelectAll)
        this.$toast.show('请选择您购买的商品',2000)
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    position: relative;
    bottom: -435px;
    display: flex;
    background-color: #eee;
  }
  .bottom-bar-left{
    display: flex;
    margin-left: 10px;
    text-align: center;
    width:60px;
    align-items: center;
  }
  .check-button{
    width:20px;
    height: 20px;
  }
  .bottom-bar-center{
    margin-left: 15px;
    flex:1;
    line-height: 40px;
  }
  .bottom-bar-right{
    width:90px;
    color:#fff;
    background-color: orangered;
    text-align: center;
    line-height: 40px;
  }
</style>
