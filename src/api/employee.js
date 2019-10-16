import request from '@/utils/request'

//获取所有员工信息
export function getEmployeAll(params){
  return request({
    url: '/json/role/getAll',
    method: 'get',
    params
  })
}