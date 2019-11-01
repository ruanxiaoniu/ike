import request from '@/utils/request'

export function getDepartmentInfo() {
  return request({
    url: '/json/department/getAll',
    method: 'get',
  })
}

export function addDepartment(data) {
  console.log("dept:  "+data.name);
  return request({
    url: `/json/department/create`,
    data:data,
    method: 'post',
  })
}

export function delDepartment(id) {
  return request({
    url: `/json/department/delete?id=${id}`,
    method: 'delete',
  })
}

export function getDepartment(id) {
  return request({
    url: `/json/department/getDetail?id=${id}`,
    method: 'get',
  })
}

export function updDepartment(data) {
  console.log("data:  "+data.id+"--->"+data.departmentName);
  return request({
    url: `/json/department/update?id=${data.id}&departmentName=${data.departmentName}`,
    method: 'put',
  })
}
