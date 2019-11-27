import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'managePicture',
        name: 'ManagePicture',
        component: () => import('../views/ManagePicture.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'messageManage',
        name: 'MessageManage',
        component: () => import('../views/MessageManage.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'basicInformation',
        name: 'BasicInformation',
        component: () => import('../views/BasicInformation.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'changePassword',
        name: 'ChangePassword',
        component: () => import('../views/ChangePassword.vue'),
        meta: {
          auth: true
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: () => import('../views/ForgetPassword.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
