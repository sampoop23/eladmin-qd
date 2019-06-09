import request from '@/utils/request'

export function generator(data, tableName) {
  return request({
    url: 'system/api/generator?tableName=' + tableName,
    data,
    method: 'post'
  })
}
