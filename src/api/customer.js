import request from '@/utils/request'
import qs from 'qs'

//获取全部客户信息/根据多条件搜索
export function getCustomerAll(params){
  return request({
    url: '/customer/listByCriteria',
    method: 'get',
    params,
    
  })
}
//获取某个用户的所有客户
export function getCustomerById(params) {
  console.log("api")
  console.log(params)
  return request({
    url: '/customer/listMyCustomer',
    method: 'get',
    params,
    
  })
}

//获取阶段表中当前存有的阶段
export function getCustomerAllStage(){
  return request({
    url:'/CustomStage/getAll',
    method:'get',
  })
}

//修改当前表中的阶段信息
export function updateStageAll(params){
  return request({
    url:'/CustomStage/update',
    data:params,
    method:'put',
  })
}

//添加阶段信息
export function addStage(params){
  return request({
    url:'/CustomStage/create',
    data:params,
    method:'post',
  })
}

//删除阶段信息
export function deleteStage(params){
  return request({
    url:'/CustomStage/delete',
    params,
    method:'delete',
  })
}
//获取某个客户阶段
export function getCustomerStage(params){
  return request({
    url:`/CustomStage/getDetail?id=${params}`,
    method:'get',
  })
}

//修改某个客户的阶段
export function updateOneStage(params){
  return request({
    url:'/customer/updateStage',
    method:'put',
    params
  })
}

//获取某个客户的阶段修改日志
export function stageLog(params){
  return request({
    url:'/customerStageLog/listByCid',
    method:'get',
    params
  })
}

//获取当前表中的来源
export function getCustomerAllOrigin(params){
  return request({
    url:'/customerOrigin/getAll',
    method:'get',
  })
}
//修改当前表中的来源信息
export function updateOriginAll(params){
  return request({
    url:'/customerOrigin/update',
    data:params,
    method:'put',
  })
}

//添加来源信息
export function addOrigin(params){
  return request({
    url:'/customerOrigin/create',
    data:params,
    method:'post',
  })
}

//删除来源信息
export function deleteOrigin(params){
  return request({
    url:'/customerOrigin/delete',
    params,
    method:'delete',
  })
}
//修改某个客户来源
export function updatOneOriginName(params){
  console.log("origin")
  console.log(params)
  return request({
    url:'/customer/updateOrigin',
    method:'put',
    params,
  })
}

//修改客户状态
export function updateState(params){
  return request({
    url:'/customer/updateState',
    method:'put',
    params,
  })
}

//获取当前表中的等级
export function getCustomerAllLevel(params){
  return request({
    url:'/customerLevel/getAll',
    method:'get',
  })
}
//修改当前表中的等级信息
export function updateLevelAll(params){
  return request({
    url:'/customerLevel/update',
    data:params,
    method:'put',
  })
}

//添加等级信息
export function addLevel(params){
  return request({
    url:'/customerLevel/create',
    data:params,
    method:'post',
  })
}

//删除等级信息
export function deleteLevel(params){
  return request({
    url:'/customerLevel/delete',
    params,
    method:'delete',
  })
}
//修改某个客户的等级
export function updatOneLevelName(params){
  console.log("origin")
  console.log(params)
  return request({
    url:'/customer/updateLevel',
    method:'put',
    params,
  })
}

//修改主联系人联系方式
export function updatePrimary(params){
  return request({
    url:'/relation/updatePhone',
    method:'put',
    params,
  })
}

//修改主联系人座机号
export function updateNumber(params){
  return request({
    url:'/relation/updateNumber',
    method:'put',
    params,
  })
}

//获取某个客户联系人信息
export function getOneRelation(params){
  return request({
    url:'/relation/listByCid',
    method:'get',
    params,
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
//新建客户
export function addCustomer(params){
  console.log("新建啦啦啦")
  console.log(params)
  return request({
    url:'/customer/create',
    method:'post',
    data:params,
  })
}