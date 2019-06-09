import request from '@/utils/request'

export function get() {
  return request({
    url: 'system/api/qiNiuConfig',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: 'system/api/qiNiuConfig',
    data,
    method: 'put'
  })
}

export function del(id) {
  return request({
    url: 'system/api/qiNiuContent/' + id,
    method: 'delete'
  })
}

export function download(id) {
  return request({
    url: 'system/api/qiNiuContent/download/' + id,
    method: 'get'
  })
}

export function sync() {
  return request({
    url: 'system/api/qiNiuContent/synchronize',
    method: 'post'
  })
}

export function delAll(ids) {
  return request({
    url: 'system/api/qiNiuContent/',
    method: 'delete',
    data: ids
  })
}
