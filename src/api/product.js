import request from '@/utils/request'

export function getProList(data) {
  return request({
    url: 'api/v1/product/list',
    method: 'POST',
    data
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
export function getProposal(type) {
  return request({
    url: 'api/v1/proposal',
    method: 'POST',
    data: {
      'type': type //about  关于我们   succ   成功案例   resol   解决方案   join 加入我们  use 使用说明
      
    }
  })
}