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
