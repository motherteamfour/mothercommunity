import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户注册手机号码
    userPhone: "",
    // 图片服务器地址
    imgUrl: "http://localhost:8080/file/"
  },
  mutations: {
    setPhone(state, n) {
      state.userPhone = n
    },
  },
  actions: {
  },
  modules: {
  }
})
