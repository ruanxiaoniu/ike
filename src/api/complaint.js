import request from '@/utils/request'

//获取全部投诉记录
export function listAll(){
  return request({
    url: 'complaint/listAll',
    method: 'get'
  })
}

//获取由我负责的记录
export function listCurHandle(){
  return request({
    url: 'complaint/listCurHandle',
    method: 'get'
  })
}

//获取未处理的记录
export function listUnHandle(){
  return request({
    url: 'complaint/listUnHandle',
    method: 'get'
  })
}

//获取已处理的记录
export function listIsHandle(){
  return request({
    url: 'complaint/listIsHandle',
    method: 'get',
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

//修改投诉记录
export function updateComplaint(params){
  return request({
    url:'/complaint/update',
    method:'put',
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
