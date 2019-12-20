import request from '@/utils/request'
import { md5 } from 'vux'
// 手机登录
export function loginByMobile(data) {
  return request({
    url: 'api/v1/user/login',
    method: 'POST',
    data
  })
}
// 微信登录
export function loginByWX(code) {
  return request({
    url: 'api/v1/wx/authorize',
    method: 'POST',
    data: {
      'code': code
    }
  })
}
// 刷新token
export function refreshToken(token, type) {
  return request({
    url: 'api/v1/user/refresh_token',
    method: 'POST',
    data: {
      'refresh_token': token,
      'type': type
    }
  })
}
// 获取验证码
export function getCheckCode(type, mobile) {
  return request({
    url: 'api/v1/code/get?test=local',
    method: 'POST',
    data: {
      'type': type,
      'mobile': mobile,
    }
  })
}
// 分享
export function shareWX(data) {
  return request({
    url: 'api/v1/wx/shareurl',
    method: 'POST',
    data
  })
}