import request from '@/utils/request'

export function getDepts(params) {
  return request({
    url: 'system/api/dept',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'system/api/dept',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'system/api/dept/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'system/api/dept',
    method: 'put',
    data
  })
}
