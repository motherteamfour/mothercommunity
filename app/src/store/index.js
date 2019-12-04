import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPhone: ""
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
