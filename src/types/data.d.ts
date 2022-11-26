// 封装返回的类型
export type ApiRes<Data> = {
  data: Data
  message: string
}

// 登录接口返回数据类型
export type Token = {
  token: string
  refresh_token: string
}
// 登录页面手机号和验证码
export type LoginFormTy = {
  mobile: string
  code: string
}
// 登录返回类型
export type LoginRes = {
  data: Token
  message: string
}
// 我的 - 个人信息
export type User = {
  id: string
  name: string
  photo: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}
// 个人信息返回类型
export type UserRes = ApiRes<User>
export type UserProfile = {
  id: string
  photo: string
  name: string
  mobile: string
  gender: number
  birthday: string
  intro: string
}
export type UserProfileResponse = ApiRes<UserProfile>

export type UserPhotoResponse = ApiResponse<{
  photo: string
}>
export type Channel = {
  id: number
  name: string
}
export type UserChannel = {
  channels: Channel[]
}
export type UserChannelResponse = ApiResponse<UserChannel>