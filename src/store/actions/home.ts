import { AppThunk } from '@/store/index'
import { Channel, UserChannelResponse } from '@/types/data'
import request from '@/utils/request'
import { setUserChannel } from '@/store/modules/home'
// 3.异步action
export function getUserChannel(): AppThunk {
  return async (dispatch, getState) => {
    // 1. 发请求获取token
    // 写法1：说明❓：request.post<指定的是后台返回data类型>
    const res: UserChannelResponse = await request.get('/user/channels')
    const { channels } = res.data
    console.log('频道列表：', channels)
    // 写法2：res:类型注解
    dispatch(setUserChannel(channels))
  }
}
