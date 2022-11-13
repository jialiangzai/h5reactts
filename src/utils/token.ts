import { Token } from '@/types/data'
const TOKEN_KEy: string = 'geek-app-token'
// 获取
const getToken = (): Token => {
  return JSON.parse(localStorage.getItem(TOKEN_KEy) ?? '{}') as Token
}
// 存储
const setToken = (token: Token): void => {
  localStorage.setItem(TOKEN_KEy, JSON.stringify(token))
}
//清除
const clearToken = () => {
  localStorage.removeItem(TOKEN_KEy)
}
// 是否登录
const isAuth = () => !!getToken().token
export { isAuth, getToken, setToken, clearToken }
