import request from '@/utils/request'

export function del(id) {
  return request({
    url: 'system/api/pictures/' + id,
    method: 'delete'
  })
}

export function delAll(ids) {
  return request({
    url: 'system/api/pictures/',
    method: 'delete',
    data: ids
  })
}
