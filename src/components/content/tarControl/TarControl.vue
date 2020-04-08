<template>
    <div class="tar-control">
      <div v-for="(item,index) in title" class="tar-control-item" :class="{active:index === currentIndex}" @click="itemClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TarControl",
        props:{
          title:{
            type:Array,
            default() {
              return []
            }
          }
        },
        data() {
          return {
            currentIndex:0,
          }
        },
        methods:{
          itemClick(index) {
            this.currentIndex = index//有些方法好神奇，实现了就这样
            this.$emit('tabClick',index)
          }
        }
    }
</script>

<style scoped>
  .tar-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    z-index: 9;
    background-color: #fff;
  }
  .tar-control-item{
    flex:1;
    height: 40px;
    line-height: 40px;
  }
  .tar-control-item span {
    padding: 5px;
  }
  .active{
    color:var(--color-high-text)
  }
  .active span{
    border-bottom: 2px solid var(--color-tint);
  }
</style>
