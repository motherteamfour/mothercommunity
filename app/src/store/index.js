import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils/http'
import vueAxios from 'vue-axios'

Vue.use(Vuex,vueAxios, http)

export default new Vuex.Store({
  state: {
    // 用户注册手机号码
    userPhone: "",
    searchKeyword: "",
    // 图片服务器地址
    imgUrl: "http://172.16.6.38:8989/",
    searchPost: ""
  },
  mutations: {
    setPhone(state, n) {
      state.userPhone = n
    },
    setSearchKeyword(state, n) {
      state.searchKeyword = n
    },
    searctPost(state, n) {
      state.searchPost = n
    }
  },
  actions: {
    /* getLists() {
      
    } */
    
  },
  getters: {
    
  },
  modules: {
  }
})
