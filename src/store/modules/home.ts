import { Channel } from '@/types/data'
import { AppThunk } from '../index'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// state变量类型
export interface homeState {
  userChannel: Channel[]
}
export const home = createSlice({
  // 命名空间，在调用action的时候会默认的设置为action命令的前缀,避免冲突
  name: 'home',
  // 1. 定义变量(状态数据)
  initialState: {
    userChannel: [],
  } as homeState,
  // 2. 定义reducers更新变量(其中函数属性名作为action，在组件中可以dispatch触发reducer函数更新状态)
  reducers: {
    // action函数(同步)
    setUserChannel(state, action: PayloadAction<Channel[]>) {
      state.userChannel = action.payload
    },
  },
})
// 导出reducer(创建store使用)
export default home.reducer
// 导出action函数
export const { setUserChannel } = home.actions
