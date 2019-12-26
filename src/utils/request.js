import axios from 'axios'
import Vue from 'vue'
import ase from './ase'
import store from '@/store'
import { getToken } from '@/api/auth'
import Qs from 'qs'

// 定义文件url头部
// 本地mock
// const url = process.env.ENV_CONFIG === 'dev' ? '/api' : process.env.BASE_API
const url = 'http://127.0.0.1:18081/assistant-center'

// 创建axios实例
const service = axios.create({
  baseURL: url, // api 的 base_url
  timeout: 10000, // 请求超时时间
  transformRequest: [
    function (data) {
      return Qs.stringify(data)
    }
  ]
})
/**
  * 提示函数
  * 禁止点击蒙层、显示一秒后关闭
  */
const tip = res => {
  // Vue.$vux.toast.show({
  //   text: res,
  //   time: 5000,
  //   type: 'warn',
  //   position: 'middle'
  // })
  Vue.$vux.toast.text(res, 'middle')
}

/**
* 请求失败后的错误统一处理
* @param  status 请求失败的状态码
*/
const errorHandle = (status, other) => {
  // 处理响应数据
  // 400 : 参数格式或者字段名错误
  // 401 : token错误、过期
  // 403: 无权限
  // 500 ： 服务错误
  // 状态码判断
  switch (status) {
    case 400:
      tip('请求无效')
      break
    case 404:
      tip('请求的资源不存在')
      break
    case 403:
      tip('无访问权限，请联系管理员！')
      break
    case 500:
      tip('服务端错误，请联系管理员！')
      break
    default:
      console.log(other)
  }
}
// console.log('统一的baseURL . ' + process.env.BASE_API)
// request拦截器
service.interceptors.request.use(
  config => {
    Vue.$vux.loading.show({ text: '加载中...' })


      if (store.getters.token) {
          config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
       }

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    Vue.$vux.loading.hide()
    const isEncrypt = store.state.isEncrypt
    const res = isEncrypt ? ase.decrypt(response.data) : response.data
    if (res.code === 200) {
      return res
    } else {
      // 请求已发出，但是不在2xx的范围
      errorHandle(res.code, res.msg)
      return Promise.reject(res.msg)
    }
  },
  error => {
    Vue.$vux.loading.hide()
    // 处理响应失败
    if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
        tip('网络超时，请联系管理员!')
return Promise.reject(error) // reject这个错误信息
    }
    return Promise.reject(error)
  }
)

export default service