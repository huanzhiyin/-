import request from '@/utils/request'
// 本地模拟mock
export function getList (params) {
  return request({
    url: '/getList',
    method: 'get',
    params
  })
}