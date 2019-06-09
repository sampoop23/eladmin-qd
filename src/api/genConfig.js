import request from '@/utils/request'

export function get() {
  return request({
    url: 'system/api/genConfig',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: 'system/api/genConfig',
    data,
    method: 'put'
  })
}
