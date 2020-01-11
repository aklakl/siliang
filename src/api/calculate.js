import request from '@/utils/request'

///old 
export function addCalc(data) {
  return request({
    url: 'api/v1/calc/lljs',
    method: 'POST',
    data
  })
}

export function commonCalc(data) {
  return request({
    url: 'api/v1/calc/tyjs',
    method: 'POST',
    data
  })
}

export function detailCalc() {
  return request({
    url: 'api/v1/calc/show',
    method: 'POST',
    data: {
      show_type: "bzlljs"
    }
  })
}
export function shareWXResult(pp) {
  return request({
    url: 'api/v1/wx/shareresult',
    method: 'POST',
    data: {
      pp
    }
  })
}