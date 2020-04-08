import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getters from "./getters";

export default new Vuex.Store({
  state: {
    cartList: []
  },
  getters,
  mutations: {
    addCounter(state, payload) {
      payload.count++
    },
    addCart(state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        // this.state.cartList.push(payload)
        let oldProduct = null
        for (let item of context.state.cartList) {
          if (item.iid === payload.iid) {
            oldProduct = item
          }
        }
        //判断oldProduct是否存在
        if (oldProduct) {
          // oldProduct.count += 1
          context.commit('addCounter', oldProduct)
          resolve('商品个数添加成功')
        } else {
          payload.count = 1
          // context.state.cartList.push(payload)
          context.commit('addCart', payload)
          resolve('商品添加成功')
        }
      })
    }
  }
})
