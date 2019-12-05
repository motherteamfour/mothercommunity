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
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: () => import('../views/ForgetPassword.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      auth: true
    },
    children: [
      {
        path: 'homePage',
        name: 'HomePage',
        component: () => import('../views/HomePage.vue'),
        meta: {
          auth: true
        }
      },
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
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('../views/users.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'addUsers',
        name: 'addUsers',
        component: () => import('../views/addUsers.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'delUsers',
        name: 'delUsers',
        component: () => import('../views/delUsers.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'recommend',
        name: 'recommend',
        component: () => import('../views/recommend.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'delAticle',
        name: 'delAticle',
        component: () => import('../views/delAticle.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'investigate',
        name: 'investigate',
        component: () => import('../views/investigate.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'delUsers',
        name: 'delUsers',
        component: () => import('../views/delUsers.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: 'aticleAll',
        name: 'aticleAll',
        component: () => import('../views/aticleAll.vue'),
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 注册全局守卫
// 在访问路由之前进行拦截
router.beforeEach((to, from, next) => {
  // 获取 token，登录的标识
  var token = sessionStorage.getItem("token")

  if(to.meta.auth) { // 判断是否需要权限
    if(token) { // 再次判断是否已经有权限了
      next()
    } else {
      next({ // 没有权限，导向登录页
        path: "/login",
        query: {redirect: to.fullPath} // 记录原本想访问的路由
      })
    }
  } else {
    next() // 想去哪就去哪
  }
})

export default router
