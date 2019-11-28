import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'amfe-flexible'
import './assets/style/resize.css'
import './assets/font-awesome/css/font-awesome.min.css'
import { Swipe, SwipeItem } from 'vant';

Vue.config.productionTip = false;
Vue.use(Swipe).use(SwipeItem);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

