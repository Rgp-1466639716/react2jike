// axios的封装
import axios from 'axios'
import { getToken, removeToken } from './token'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use((config)=> {
    // 获取token
    const token = getToken()
    // 请求头添加token 按后端的格式拼接
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  }, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 监控401,token失效后端报401
    if(error.response.status === 401){
      // 清除失效localstore token
      removeToken()
      // 跳转登录
      router.navigate('/login')
      window.location.reload()
    }
    return Promise.reject(error)
})

export { request }