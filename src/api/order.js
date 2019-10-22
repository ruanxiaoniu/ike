import request from '@/utils/request'

//获取全部订单记录
export function getAllOrder(){
  return request({
    url: 'json/orderBase/listAll',
    method: 'get'
  })
}

//将消息状态置为已读 - 批量
export function batchToRead(params){
  return request({
    url: 'message/batchToRead',
    method: 'put',
    data :  params
  })
}
