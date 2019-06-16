import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'system/api/equipment/trashcan',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'system/api/equipment/trashcan/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'system/api/equipment/trashcan',
    method: 'put',
    data
  })
}
