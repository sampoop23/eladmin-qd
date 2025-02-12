import request from '@/utils/request'

// 获取所有的Role
export function getAll() {
  return request({
    url: 'system/api/roles/all',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'system/api/roles',
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: 'system/api/roles/' + id,
    method: 'get'
  })
}

export function getLevel() {
  return request({
    url: 'system/api/roles/level',
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'system/api/roles/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'system/api/roles',
    method: 'put',
    data
  })
}

export function editPermission(data) {
  return request({
    url: 'system/api/roles/permission',
    method: 'put',
    data
  })
}

export function editMenu(data) {
  return request({
    url: 'system/api/roles/menu',
    method: 'put',
    data
  })
}
