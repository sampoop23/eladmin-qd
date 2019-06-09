import request from '@/utils/request'

export function count() {
  return request({
    url: 'system/api/visits',
    method: 'post'
  })
}

export function get() {
  return request({
    url: 'system/api/visits',
    method: 'get'
  })
}

export function getChartData() {
  return request({
    url: 'system/api/visits/chartData',
    method: 'get'
  })
}
