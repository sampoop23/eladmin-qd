import request from '@/utils/request'

// 获取所有的菜单树
export function getMenusTree() {
  return request({
    url: 'system/api/menus/tree',
    method: 'get'
  })
}

export function buildMenus() {
  return request({
    url: 'system/api/menus/build',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'system/api/menus',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'system/api/menus/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'system/api/menus',
    method: 'put',
    data
  })
}
