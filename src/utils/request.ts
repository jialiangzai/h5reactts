import axios, { AxiosError } from 'axios'
import store from '@/store'

import { history } from '@/router/history'
import { Toast } from 'antd-mobile'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  timeout: 5000,
})
// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const { token } = store.getState().login
    if (token) {
      config.headers!.Authorization = `Bearer ${token.token}`
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    // 对响应错误做点什么
    // 对响应数据做点什么
    if (error.response.status === 401) {
      // 401直接跳回登录页=》重新登陆
      Toast.show({
        content: '没有登录或token过期了',
        icon: 'fail',
        afterClose: () => {
          // 删除token
          //  store.dispatch(logout())
          history.replace('/login', { from: history.location.pathname })
        },
      })
      // js做跳转不如组件因为useNavigate只能用于函数组件
      // 安装：yarn add history
      // 创建 router/history.js 文件
      // 在该文件中，创建一个 hisotry 对象并导出
      // 携带参数
      // 在入口index.js 中导入 history 对象，并设置为 Router 的 history
      // 通过响应拦截器处理 token 失效
      history.replace('/login', {
        redirectUrl: history.location.pathname,
      })
    }
    return Promise.reject(error)
  }
)
export default request
