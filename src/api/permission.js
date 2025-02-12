import request from '@/utils/request'

// 获取所有的权限树
export function getPermissionTree() {
  return request({
    url: 'system/api/permissions/tree',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'system/api/permissions',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'system/api/permissions/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'system/api/permissions',
    method: 'put',
    data
  })
}
