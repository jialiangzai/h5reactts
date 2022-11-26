import axios, { AxiosError } from 'axios'
import store from '@/store'

import { history } from '@/router/history'
import { Toast } from 'antd-mobile'
import { isAuth } from './token'
import { changeToken } from '@/store/modules/login'

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
  async (error) => {
    // 对响应错误做点什么
    // 对响应数据做点什么
    if (error.response.status === 401) {
      // 401直接跳回登录页=》重新登陆
      // Toast.show({
      //   content: '没有登录或token过期了',
      //   icon: 'fail',
      //   afterClose: () => {
      //     // 删除token
      //     //  store.dispatch(logout())
      //     history.replace('/login', { from: history.location.pathname })
      //   },
      // })
      // js做跳转不如组件因为useNavigate只能用于函数组件
      // 安装：yarn add history
      // 创建 router/history.js 文件
      // 在该文件中，创建一个 hisotry 对象并导出
      // 携带参数
      // 在入口index.js 中导入 history 对象，并设置为 Router 的 history
      // 通过响应拦截器处理 token 失效
      // history.replace('/login', {
      //   redirectUrl: history.location.pathname,
      // })
      // 刷新token
      try {
        // 1. 401情况，使用 try-catch 处理异常，捕获异常时，清除本地 token和清空 redux token，提示消息并跳转到登录页面，最后抛出错误
        // 2. 判断是否登录：
        //   1. 没有登录：直接抛出异常，无需刷新
        //   2. 登录过：使用 `refresh_token` 通过默认的 axios 发送请求，换取新的 token
        // 3. 将新获取到的 token 存储到本地缓存中和 redux 中
        // 4. 使用封装的axios**继续发送原来的请求**
        // 注意：refresh_token有过期时间，一般比token过期时间长
        if (!isAuth()) {
          // 没登陆过
          throw new Error(error)
        }
        const {
          token: { refresh_token },
        } = store.getState().login
        const { data } = await axios.put(
          'http://toutiao.itheima.net/v1_0/authorizations',
          null,
          {
            headers: {
              Authorization: `Bearer ${refresh_token}`,
            },
          }
        )
        // 组装新token，存到本地和redux
        const newToken = {
          token: data.data.token,
          refresh_token,
        }
        // console.log('newToken', newToken)
        store.dispatch(changeToken(newToken))
        return request(error.config)
      } catch (error) {
        Toast.show({
          content: '没有登录或refresh_token过期了',
          icon: 'fail',
          afterClose: () => {
            // 删除token
            //  store.dispatch(logout())
            history.replace('/login', { from: history.location.pathname })
          },
        })
      }
    }
    return Promise.reject(error)
  }
)
export default request
