import request from '@/utils/request'

export function getErrDetail(id) {
  return request({
    url: 'system/api/logs/error/' + id,
    method: 'get'
  })
}
