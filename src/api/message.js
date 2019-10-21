import request from '@/utils/request'

//获取全部内部消息
export function getAllMessage(){
  return request({
    url: 'message/listAll',
    method: 'get'
  })
}

//获取未读内部消息信息
export function getUnReadMessage(){
  return request({
    url: 'message/listUnRead',
    method: 'get'
  })
}

//获取已读内部消息信息
export function getIsReadMessage(){
  return request({
    url: 'message/listIsRead',
    method: 'get'
  })
}

//删除消息 - 批量
export function batchDelete(params){
  return request({
    url: 'message/batchDelete',
    method: 'delete',
    data :  params
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
