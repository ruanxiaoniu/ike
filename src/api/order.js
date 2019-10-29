import request from '@/utils/request'

//获取全部订单记录
export function getAllOrder(){
  return request({
    url: '/json/orderBase/listAll',
    method: 'get'
  })
}

//多条件获取订单
export function searchOrder(params){
  return request({
    url: '/json/orderBase/listBySearch',
    method: 'get',
    params
  })
}

//获取某个订单详情
export function orderById(params){
  return request({
    url: '/json/orderBase/detail',
    method: 'get',
    params
  })
}

//批量删除订单
export function deleteOrder(params){
  console.log("删除了")
  console.log(params)
  return request({
    url: '/json/orderBase/deleteBatch',
    method: 'delete',
    data:params
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


//修改某个订单信息
export function updateOrder(params){
  return request({
    url: '/json/orderBase/updateOrderWithProduct',
    method: 'put',
    data:params
  })
}

//新建订单
export function createOrder(params){
  return request({
    url: '/json/orderBase/createOrderWithProduct',
    method: 'post',
    data:params
  })
}

