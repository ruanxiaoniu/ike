import request from '@/utils/request'
//多条件获取客户跟进信息
export function getFollowAll(params){
 return request({
   url:'/follow/listByCriteria',
   method: 'get',
   params,
 })
}

//获取某一条跟进的详情
export  function getFollowDetail(params){
  return request({
    url:'/follow/detail',
    method: 'get',
    params,
  })
}
//修改跟进信息
export function updateFollow(params){
  return request({
    url:'/follow/update',
    method: 'put',
    data:params,
  })
}
//删除跟进信息
export function deleteFollow(params){
  return request({
    url:'/follow/delete',
    method: 'delete',
    params,
  })
}
//添加联系跟进内容
export function addFollow(params){
  console.log('follow');
  console.log(params);
  
  return request({
    url:'/follow/create',
    method: 'post',
    data:params,
  })
}

//获取所有跟进计划信息
export function planAll(params){
  return request({
    url:'/followPlan/listByCriteria',
    method: 'get',
    params,
  })
}
//更新计划为失败
export function planFail(params){
  return request({
    url:'/followPlan/fail',
    method: 'put',
    data:params,
  })
}
//更新计划为已完成
export function planComplete(params){
  return request({
    url:'/followPlan/complete',
    method: 'put',
    data:params,
  })
}
//获取某条跟进计划详情
export function planDetail(params){
  return request({
    url:'/followPlan/detail',
    method: 'get',
    params,
  })
}

//修改某条跟进计划
export function updatePlan(params){
  return request({
    url:'/followPlan/update',
    method: 'put',
    data:params,
  })
}

//删除跟进计划
export function deletePlan(params){
  return request({
    url:'/followPlan/deleteByIds',
    method: 'delete',
    data:params,
  })
}

//添加跟进计划
export function addPlan(params){
  return request({
    url:'/followPlan/create',
    method: 'post',
    data:params,
  })
}