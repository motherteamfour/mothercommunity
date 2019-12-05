import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPhone: "",
    
  },
  mutations: {
    setPhone(state, n) {
      state.userPhone = n
    },
    
    
  },
  actions: {
    getLists(context) {
      this.axios({
        url: `/search/searchPost?userId=1001&searchMessage=${context}`,
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
