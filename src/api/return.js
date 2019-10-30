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
    url: '/json/returnDetail/deleteBatch',
    method: 'delete',
    data:params
  })
}

//添加回款管理记录
export function createReturn(params){
  return request({
    url: '/json/returnDetail/create',
    method: 'post',
    params
  })
}

//获取某个回款信息
export function returnById(params){
  return request({
    url: '/json/returnDetail/listReturnDetailSearch',
    method: 'get',
    params
  })
}

//修改回款
export function updateReturn(params){
  return request({
    url: '/json/returnDetail/update',
    method: 'put',
    params
  })
}
