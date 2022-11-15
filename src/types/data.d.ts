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
