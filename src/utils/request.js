import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vux'
Vue.component('toast', Toast)
import store from '../store'
import { getToken, getrefreshToken } from '@/utils/auth'
import router from '../router'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间

})

// request拦截器
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['Authorization'] = `${getToken()}` // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  config.headers["Access-Control-Allow-Origin"] = "*"
  config.validateStatus = function (status) {
    console.log("testmingstatus="+status)
    return status >= 200 && status < 400
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error.response)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
    * code为非0000是抛错 可结合自己业务进行修改
    */
    //console.log("ming-response="+JSON.stringify(response));
    const res = response.data
    if (res.resCode !== 200) {
      if (res.resCode === 3004 || res.resCode === 3003) {
        // Vue.$vux.toast.text(res.resMsg)
        localStorage.clear();
        router.push("/");
      } else {
        Vue.$vux.toast.text(res.resMsg)
      }
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    //console.log('ming-error=' + JSON.stringify(error))// for debug
    Vue.$vux.toast.text(error.message)
    // store.dispatch('FedLogOut').then(() => {
    //   Message({
    //     message: error.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   router.push('/login')
    //   // location.reload()// 为了重新实例化vue-router对象 避免bug
    // })
    return Promise.reject(error)
  }
)

export default service
