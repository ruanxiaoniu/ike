import request from '@/utils/request'

//多条件获取跟进任务信息
export function getArrangeAll(params){
  return request({
    url:'/followArrange/listByCriteria',
    method: 'get',
    params,
  })
}
