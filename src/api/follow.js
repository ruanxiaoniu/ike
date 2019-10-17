import request from '@/utils/request'
//获取客户跟进信息
export function getFollowAll(params){
 return request({
   url:'/follow/list',
   method: 'get',
   params,
 })
}