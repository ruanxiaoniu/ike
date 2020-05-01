import request from '@/utils/request'

//获取全部投诉记录
export function listAll(params){
  return request({
    url: 'complaint/listAll',
    method: 'get',
    params: params
  })
}

//获取由我负责的记录
export function listCurHandle(params){
  return request({
    url: 'complaint/listCurHandle',
    method: 'get',
    params: params
  })
}

//获取未处理的记录
export function listUnHandle(params){
  return request({
    url: 'complaint/listUnHandle',
    method: 'get',
    params: params
  })
}

//获取已处理的记录
export function listIsHandle(params){
  return request({
    url: 'complaint/listIsHandle',
    method: 'get',
    params: params
  })
}

//删除投诉记录 - 批量
export function batchDelete(params){
  return request({
    url: 'complaint/batchDelete',
    method: 'delete',
    data :  params
  })
}

//修改投诉状态
export function updateComplaintStatus(params){
  return request({
    url:'/complaintHandle/handleComplaint',
    method:'post',
    params,
  })
}

//根据投诉id获取投诉记录
export function getComplaintById(id){
  return request({
    url:`/complaint/getById?id=${id}`,
    method:'get',
  })
}

//根据投诉id获取投诉处理记录
export function getHandlesById(complaintId){
  return request({
    url:`/complaint/handle/listByComplaintId?complaintId=${complaintId}`,
    method:'get',
  })
}

//新增
export function addComplaint(params){
  return request({
    url:`complaint/insert`,
    method:'post',
    data: params
  })
}
