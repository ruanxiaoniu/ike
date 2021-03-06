import request from '@/utils/request'

//删除
export function deleteRelation(params){
  return request({
    url: '/relation/deleteByIds',
    method: 'delete',
    data:params
  })
}

//添加
export function createRelation(params){
  return request({
    url: '/relation/create',
    method: 'post',
    data:params
  })
}
//修改
export function updateRelation(params){
  return request({
    url: '/relation/update',
    method: 'put',
    data:params
  })
}

//获取某个联系人信息
export function getRelationDetail(params){
  return request({
    url:'/relation/getDetail',
    method:'get',
    params,
  })
}