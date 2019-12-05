import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Forum from '../views/Forum.vue'
import My from '../views/My.vue'
import Entrance from '../views/Entrance.vue'
// import { Search } from 'vant'
/* import NewPost from '../views/NewPost.vue' */
import Searchs from '../views/Search.vue'
import InfoComment from '../views/InfoComment.vue'

Vue.use(VueRouter)

const routes = [
  // 登陆注册
  {
    path: '/login',
    component: Entrance,
    children: [
      {
        path: '',
        name: 'Entrance',//登陆-(密码登陆/验证码登陆)
        component: () => import('../views/Entrance.vue'),
      },

    ]
  },
  {
    path: '/register',//注册
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/registerPass',//注册设置密码
    name: 'RegisterPass',
    component: () => import('../views/RegisterPass.vue'),
  },
  {
    path: '/findpassword',//找回密码
    name: 'FindPassword',
    component: () => import('../views/FindPassword.vue'),
  },
  {
    // SelectState
    path: '/selectState',//选择状态
    name: 'SelectState',
    component: () => import('../views/SelectState.vue'),
  },
  // app
  {
    path: '/',
    component: Home,
    children: [
      //社区--赵蕊
      {
        path: '',
        name: 'Community',
        component: () => import('../views/Community.vue'),
      },
      //圈子--颜志鹏
      {
        path: 'forum',
        component: Forum,
        children: [
          {
            path: '',
            name: 'Recommend',
            component: () => import('../views/Recommend.vue'),
          },
          {
            path: 'followed',
            name: 'Followed',
            component: () => import('../views/Followed.vue'),
          }

        ]

      },
      //问答-曾晶
      {
        path: 'qanda',
        name: 'QandA',
        component: () => import('../views/QandA.vue'),
        children: [ // 子路由
          {
            path: "",
            name: "HotQuestion",//热门问题
            component: () => import('../views/HotQuestion.vue'),

          },
          {
            path: 'unsolved',//未解决的问题
            name: 'Unsolved',
            component: () => import('../views/Unsolved.vue'),
          },

        ]
      },

      {
        path: 'suresearch',// 确定搜索
        name: 'SureSearch',
        component: () => import('../views/SureSearch.vue'),
      },
      // 百科
      {
        path: 'encyclopedia',
        name: 'Encyclopedia',//百科
        component: () => import('../views/Encyclopedia.vue'),

      },
      // 我的-赵蕊
      {
        path: 'my',//我的
        component: My,
      },
      {
        path: 'newpost', //我的发帖
        name: 'NewPost',
        component: () => import('../views/NewPost.vue'),
        /* children: [
          {
            path: 'newpostlists',
            name: NewPostLists,
            component: () => import('../views/NewPostLists.vue')
          }
        ] */
      },
      {
        path: 'reply', //我的回帖
        name: 'Reply',
        component: () => import('../views/Reply.vue')
      },
      {
        path: 'collect', //我的收藏
        name: 'Collect',
        component: () => import('../views/Collect.vue')

      },
      {
        path: 'resource', //我的资料
        name: 'Resource',
        component: () => import('../views/MyResources.vue')
      },
      {
        path: 'group/:id',
        name: 'Group',
        component: () => import('../views/Group.vue')
      },
      {
        path: 'searchs', // 搜索

        component: Searchs,
        children: [
          {
            path: '',
            name: 'SearchPost',
            component: () => import('../views/SearchPost.vue')
          },
          {
            path: 'userpage',
            name: 'Userpage',
            component: () => import('../views/Userpage.vue'),
          }
        ]
      },
      {
        path: 'infomation', // 消息
        name: "Infomation",
        component: () => import('../views/Infomation.vue')
      },
      {
        path: 'trigger',
        name: "Trigger",
        component: () => import('../views/Trigger.vue')
      },
      {
        path: 'infocomment', // 消息中的评论
        component: InfoComment,
        children: [
          {
            path: '',
            name: 'Received',
            component: () => import('../views/Received.vue')
          },
          {
            path: 'sented',
            name: 'Sented',
            component: () => import('../views/Sented.vue'),
          }
        ]

      },
      {
        path: 'infolike', // 消息中的点赞
        name: 'InfoLike',
        component: () => import('../views/InfoLike.vue')
      },
      {
        path: 'inform', //消息中通知
        name: 'Inform',
        component: () => import('../views/Inform.vue')
      },
      {
        path: 'altername', //消息中通知
        name: 'Altername',
        component: () => import('../views/AlterName.vue')
      }
    ]
  },
  //home外的单独页面-颜志鹏
  {
    path: '/post/:id',//发布帖子
    name: 'Post',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/circlegourp', //所有圈子
    name: 'circlegourp',
    component: () => import('../views/CircleGourp.vue')
  },
  {
    path: '/article/:id', //帖子
    name: 'article',
    component: () => import('../views/Article.vue')
  },
  {
    path: '/otherUsers/:id', //帖子
    name: 'otherUsers',
    component: () => import('../views/OtherUsers.vue')
  },
  // 问答-曾晶
  {
    path: '/ask',
    name: 'Ask',
    component: () => import('../views/Ask.vue'),

  },
  {
    path: '/iwillanswer/:questionId',
    name: 'IWillAnswer',
    component: () => import('../views/IWillAnswer.vue'),

  },
  {

    path: '/searchquestion',//搜索问题
    name: 'SearchQuestion',
    component: () => import('../views/SearchQuestion.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/questiondetail/:questionId',// 问题详情页
    name: 'QuestionDetail',
    component: () => import('../views/QuestionDetail.vue'),
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 注册全局守卫
// 在访问路由之前进行拦截
// router.beforeEach((to, from, next) => {
//   // 获取 token，登录的标识
//   var token = sessionStorage.getItem("token")

//   if (to.meta.auth) { // 判断是否需要权限
//     if (token) { // 再次判断是否已经有权限了
//       next()
//     } else {
//       next({ // 没有权限，导向登录页
//         path: "/login",
//         query: { redirect: to.fullPath } // 记录原本想访问的路由
//       })
//     }
//   } else {
//     next() // 想去哪就去哪
//   }
// })
export default router
