import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/performanceDataTrashcan',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/performanceDataTrashcan/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/performanceDataTrashcan',
    method: 'put',
    data
  })
}
