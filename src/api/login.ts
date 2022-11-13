import request from '@/utils/request'
// 发送验证码
export function onGetCode(mobile: string) {
  return request.get(`/sms/codes/${mobile}`)
}
