/*封装axios代码*/
import axios from 'axios'
import {message} from 'antd'
import store from '../redux/store'

/*使用拦截器封装*/
// 1.创建 axios 实例
const instance = axios.create({
  // 请求地址
  baseURL: 'http://localhost:3000/api',
  // 请求超时时间
  timeout: 5000,
})

// 2. 设置请求拦截器 （发送请求之前触发的函数）
instance.interceptors.response.use(
  // 加上公共的请求头
  (config) => {
    //  因为login不需要加请求头，要过滤
    const {token} = store.getState().user
    //token 有值就加上请求头
    if (token) {
      //  config 发送请求的配置对象   使用store上的方法getState
      config.headers.authorization = token
    }
    //  必须 return
    return config
  }
)

// 3. 设置相应拦截器（处理响应之前触发的函数）
instance.interceptors.response.use(
  /*请求成功后调用   相当于 .then() 方法*/
  (response) => {
    const result = response.data
    /*请求成功不代表功能成功*/
    //功能成功
    if (result.status === 0) {
      return result.data
    } else {
      //  功能失败   返回失败状态的 premise 对象  触发 后面的 catch 方法
      // 发出错误提示
      message.error(result.msg)
      return Promise.reject(result.msg)
    }
  },
  /*请求失败后调用,状态码是 400 或 500 的   相当于 .catch() 方法
  * 再此统一做请求失败的响应*/
  (error) => {
    console.log(error)
    message.error('网络错误，请稍后重试~~')
  }
)


export default instance