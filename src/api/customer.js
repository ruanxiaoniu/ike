import request from '@/utils/request'

export function getCustomerAll(params) {
  return request({
    url: '/customer/allList',
    method: 'get',
    params
  })
}


