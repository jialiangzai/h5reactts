import { AppThunk } from '../index'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/data'
// state变量类型
export interface profileState {
  user: User
}
export const profile = createSlice({
  // 命名空间，在调用action的时候会默认的设置为action命令的前缀,避免冲突
  name: 'profile',
  // 1. 定义变量(状态数据)
  initialState: {
    user: {},
  } as profileState,
  // 2. 定义reducers更新变量(其中函数属性名作为action，在组件中可以dispatch触发reducer函数更新状态)
  reducers: {
    // action函数(同步)
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    // delTokenRd (state) {
    //   state.token = ''
    // }
  },
})
// 导出reducer(创建store使用)
export default profile.reducer
// 导出action函数
export const { setUser } = profile.actions
// 3.异步action
// export function asyncAction(payload?: unknown): AppThunk {
//   return async (dispatch, getState) => {
//     // 1. 发请求获取token
//     // 写法1：说明❓：request.post<指定的是后台返回data类型>
//     // const res = await request.post<Token>('/authorizations', formData)
//     // 写法2：res:类型注解
//     dispatch(setUser())
//   }
// }
