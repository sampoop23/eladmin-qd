import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/performanceHisDataTrashcan',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/performanceHisDataTrashcan/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/performanceHisDataTrashcan',
    method: 'put',
    data
  })
}
