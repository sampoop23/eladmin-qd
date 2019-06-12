import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/areaCode',
    method: 'post',
    data
  })
}

export function del(code) {
  return request({
    url: 'api/areaCode/' + code,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/areaCode',
    method: 'put',
    data
  })
}
