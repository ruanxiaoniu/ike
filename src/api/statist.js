import request from '@/utils/request'

//产品统计
export function productStatist(params){
  return request({
    url: '/statistics/staProduct',
    method: 'get',
    params
  })
}

//新增客户
export function addCustomerStatist(params){
  return request({
    url: '/statistics/staCustomerAdd',
    method: 'get',
    params
  })
}

//跟进客户数
export function followCustomerStatist(params){
  return request({
    url: '/statistics/staCustomerFollow',
    method: 'get',
    params
  })
}

//跟进记录
export function followRecordStatist(params){
  return request({
    url: '/statistics/staFollowAdd',
    method: 'get',
    params
  })
}