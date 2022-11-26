import { AppThunk } from '@/store/index'
import { LoginFormTy, LoginRes } from '@/types/data'
import request from '@/utils/request'
import { changeToken } from '@/store/modules/login'
import { clearToken } from '@/utils/token'
// 3.异步action
export function asyncLoginAction(loginForm: LoginFormTy): AppThunk {
  return async (dispatch, getState) => {
    // 1. 发请求获取token
    // 写法1：说明❓：request.post<指定的是后台返回data类型>
    const res: LoginRes = await request.post('/authorizations', loginForm)
    console.log('res', res)
    let resToken = res.data
    // 写法2：res:类型注解
    dispatch(changeToken(resToken))
  }
}

export const logoutAction = (): AppThunk => {
  return async (dispatch) => {
    dispatch(
      changeToken({
        token: '', // 用户token令牌
        refresh_token: '', // 用于刷新token的令牌
      })
    )
    clearToken()
  }
}
