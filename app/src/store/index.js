import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户注册手机号码
    userPhone: "",
    // 问题搜索关键字
    searchKeyword: "",
    // 图片服务器地址
    imgUrl: "http://172.16.6.38:8989/"
  },
  mutations: {
    // 设置用户注册手机号码
    setPhone(state, n) {
      state.userPhone = n
    },
    // 设置问题搜索关键字
    setSearchKeyword(state, n) {
      state.searchKeyword = n
    },
  },
  actions: {
  },
  modules: {
  }
})
