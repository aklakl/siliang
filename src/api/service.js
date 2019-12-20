import request from '@/utils/request'

export function getMyinfo() {
  return request({
    url: 'api/v1/user/info',
    method: 'POST',
  })
}
export function getIssign() {
  return request({
    url: 'api/v1/user/signlist',
    method: 'POST',
  })
}
export function getDetail(id) {
  return request({
    url: 'api/v1/product/detail',
    method: 'POST',
    data: {
      'productId': id
    }
  })
}
export function updateMyInfo(data) {
  return request({
    url: 'api/v1/user/update',
    method: 'POST',
    data
  })
}
export function updatePhone(data) {
  return request({
    url: 'api/v1/user/phone',
    method: 'POST',
    data
  })
}
export function Sign() {
  return request({
    url: 'api/v1/user/sign',
    method: 'POST',
  })
}
export function question(data) {
  return request({
    url: 'api/v1/question',
    method: 'POST',
    data
  })
}
// 所有产品名称
export function allProName() {
  return request({
    url: 'api/v1/product/all',
    method: 'POST',
  })
}
export function addMoments(data) {
  return request({
    url: 'api/v1/share/add',
    method: 'POST',
    data
  })
}
export function shareList(data) {
  return request({
    url: 'api/v1/share/list',
    method: 'POST',
    data
  })
}
export function otherList(uid, data) {
  return request({
    url: 'api/v1/share/otherlist',
    method: 'POST',
    data: {
      'uid': uid,
      'pageNo': data.pageNo,
      'pageSize': data.pageSize
    }
  })
}
export function selfList(data) {
  return request({
    url: 'api/v1/share/selfllist',
    method: 'POST',
    data
  })
}
// 上传文件
export function uploadFile(data, filename) {
  const formData = new FormData()
  formData.append('file', data, filename)
  return request({
    url: 'api/v1/file',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

}