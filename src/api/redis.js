import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'system/api/redis',
    method: 'post',
    data
  })
}

export function del(key) {
  const data = {
    key
  }
  return request({
    url: 'system/api/redis/',
    method: 'delete',
    data
  })
}

export function delAll() {
  return request({
    url: 'system/api/redis/all',
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'system/api/redis',
    method: 'put',
    data
  })
}
