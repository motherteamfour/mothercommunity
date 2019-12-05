import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils/http'
import vueAxios from 'vue-axios'

Vue.use(Vuex,vueAxios, http)

export default new Vuex.Store({
  state: {
    // 用户注册手机号码
    userPhone: "",
    // 图片服务器地址
    imgUrl: "http://172.16.6.38:8989/"
  },
  mutations: {
    setPhone(state, n) {
      state.userPhone = n
    },
    
    
  },
  actions: {
    getLists() {
      this.axios({
        url: `/search/searchPost?userId=1001&searchMessage='帖子'`,
        methods: "GET"
      })
      .then (res => {
        console.log(res.data);
        if(res.data.code == 200) {
          this.$router.replace('/searchs/havingpost');
          this.postnum = res.data.data;
          console.log(this.postnum);
        
        }
      })
    }
    
  },
  getters: {
    
  },
  modules: {
  }
})
