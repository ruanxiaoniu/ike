import request from '@/utils/request'

//获取全部退款记录
export function getAllRefund(params){
  return request({
    url: '/json/refund/searchRefund',
    method: 'get',
    params
  })
}

//批量删除
export function deleteRefund(params){
  return request({
    url: '/json/refund/deleteBatch',
    method: 'delete',
    data:params
  })
}

//添加退款管理记录
export function creatRefund(params){
  return request({
    url: '/json/refund/create',
    method: 'post',
    params
  })
}

//获取某个退款信息
export function refundById(params){
  return request({
    url: '/json/refund/searchRefund',
    method: 'get',
    params
  })
}

//修改退款
export function updateRefund(params){
  return request({
    url: '/json/refund/update',
    method: 'put',
    params
  })
}
