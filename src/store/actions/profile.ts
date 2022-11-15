import request from '@/utils/request'
import { User } from '@/types/data'
import { AppThunk } from '@/store'
import { setUser } from '../modules/profile'
type UserResponse = {
  data: User
  message: string
}

// 我的页面 - 获取个人信息
export function getUser(): AppThunk {
  return async (dispatch) => {
    const res: UserResponse = await request.get('/user')
    const { data, message } = res
    console.log(res)
    dispatch(setUser(data))
  }
}
