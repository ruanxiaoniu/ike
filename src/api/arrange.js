import request from '@/utils/request'

//多条件获取跟进任务信息
export function getArrangeAll(params){
  return request({
    url:'/followArrange/listByCriteria',
    method: 'get',
    params,
  })
}

//更新任务为失败
export function arrangeFail(params){
  return request({
    url:'/followArrange/fail',
    method: 'put',
    data:params,
  })
}
//更新任务为已完成
export function arrangeComplete(params){
  return request({
    url:'/followArrange/complete',
    method: 'put',
    data:params,
  })
}
//获取某条跟进任务详情
export function arrangeDetail(params){
  return request({
    url:'/followArrange/detail',
    method: 'get',
    params,
  })
}

//修改某条跟进任务
export function updateArrange(params){
  return request({
    url:'/followArrange/update',
    method: 'put',
    data:params,
  })
}

//删除跟进任务
export function deleteArrange(params){
  return request({
    url:'/followArrange/deleteByIds',
    method: 'delete',
    data:params,
  })
}

//添加跟进任务
export function addArrange(params){
  return request({
    url:'/followArrange/create',
    method: 'post',
    data:params,
  })
}

