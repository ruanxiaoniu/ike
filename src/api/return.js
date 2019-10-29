import request from '@/utils/request'

//获取全部回款记录
export function getAllReturn(params){
  return request({
    url: '/json/returnDetail/listReturnDetailSearch',
    method: 'get',
    params
  })
}

//批量删除
export function deleteReturn(params){
  return request({
    url: '/json/returnDetail/listReturnDetailSearch',
    method: 'delete',
    data:params
  })
}
