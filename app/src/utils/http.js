//对axios进行二次封装
import axios from 'axios'
import router from '../router/'

//添加一个新的axios实例
const http = axios.create({
  baseURL: '/api',
  //请求超时
  timeout: 60000
})

//请求拦截request
http.interceptors.request.use(function (config) {
  // 每次请求先将请求拦截下来，获取 token
  const token = sessionStorage.getItem('token');
  if (token) {
    // config是请求体
    // 在请求头上带上 token,
    // Bearer是固定写法
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config;
}, function (error) {
  console.log('请求拦截错误：', error)
  return Promise.reject(error)
});

// 响应拦截response，处理错误，如token不合法
http.interceptors.response.use(function (response) {
  if (response.data.data) {
    // sessionStorage.setItem('token', response.data.token) // 将服务器返回的最新token更新到本地中
  }

  return response;
}, function (error) {
  console.log('服务器响应错误：', error);
  const _response = error.response

  switch (_response.status) {
    case 401:
      return router.replace({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath }
      })

  }

  return Promise.reject(error);
});

export default http

