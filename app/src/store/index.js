import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPhone: "",
    imgUrl: "http://172.16.6.38:8989/"
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
