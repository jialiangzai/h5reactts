import request from '@/utils/request'
import {
  User,
  UserProfileResponse,
  UserProfile,
  UserPhotoResponse,
} from '@/types/data'
import { AppThunk } from '@/store'
import { setUser, setEditUser, updateEditUser } from '../modules/profile'
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
// 我的页面 - 获取个人信息
export function getUserProfile(): AppThunk {
  return async (dispatch) => {
    const res: UserProfileResponse = await request.get('/user/profile')
    const { data, message } = res
    console.log(res)
    dispatch(setEditUser(data))
  }
}
// 我的页面 - 获取个人信息
export function updateUserProfile(UserProfile: Partial<UserProfile>): AppThunk {
  return async (dispatch) => {
    const res = await request.patch('/user/profile', UserProfile)
    // console.log(res)
    dispatch(updateEditUser(UserProfile))
  }
}
// 我的页面 - 获取个人信息
export function updatePhoto(fm: FormData): AppThunk {
  return async (dispatch) => {
    const res: UserPhotoResponse = await request.patch('/user/photo', fm)
    // console.log(res)
    dispatch(updateUserProfile({ photo: res.data.photo }))
  }
}
