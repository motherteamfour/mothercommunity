import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'amfe-flexible'
import './assets/style/resize.css'
import './assets/font-awesome/css/font-awesome.min.css'


import http from './utils/http'
import vueAxios from 'vue-axios'
Vue.use(vueAxios, http)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')