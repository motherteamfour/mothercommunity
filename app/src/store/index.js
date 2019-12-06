import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils/http'
import vueAxios from 'vue-axios'

Vue.use(Vuex,vueAxios, http)

export default new Vuex.Store({
  state: {
    // 用户注册手机号码
    userPhone: "",
    // 问题搜索关键字
    searchKeyword: "",
    // 图片服务器地址
    imgUrl: "http://172.16.6.3:8989/",
    searchPost: ""
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
