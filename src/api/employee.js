import request from '@/utils/request'

// 获取所有员工信息
export function getEmployeeAll(params) {
  return request({
    url: '/json/user/getAll',
    method: 'get',
    params
  })
}

// 根据ID获取用户信息
export function getEmployeeById(params) {
  return request({
    url: '/json/user/getDetail',
    method: 'get',
    params
  })
}
// 获取所有角色信息
export function getRoleAll(params) {
  return request({
    url: '/json/role/getAll',
    method: 'get',
    params
  })
}
