import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'Community',//社区
        component: () => import('../views/Community.vue'),

      }, {
        path: 'forum',
        name: 'Forum',//圈子
        component: () => import('../views/Forum.vue'),

      },
      {
        path: 'qanda',
        name: 'QandA',//问答
        component: () => import('../views/QandA.vue'),
      },
      {
        path: 'encyclopedia',
        name: 'Encyclopedia',//百科
        component: () => import('../views/Encyclopedia.vue'),

      },
      {
        path: 'my',
        name: 'My',//我的
        component: () => import('../views/My.vue'),

      }

    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
