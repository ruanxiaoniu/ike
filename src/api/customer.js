import request from '@/utils/request'

export function getCustomerAll(params) {
  return request({
    url: '/customer/_listByEid',
    method: 'get',
    params,
  })
}


