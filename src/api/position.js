import request from '@/utils/request'

export function getPositionInfo() {
  return request({
    url: '/json/position/getAll',
    method: 'get',
  })
}

export function addPosition(data) {
  console.log("dept:  "+data.name);
  return request({
    url: `/json/position/create`,
    data:data,
    method: 'post',
  })
}

export function delPosition(id) {
  return request({
    url: `/json/position/delete?id=${id}`,
    method: 'delete',
  })
}

export function getPosition(id) {
  return request({
    url: `/json/position/getDetail?id=${id}`,
    method: 'get',
  })
}

export function updPosition(data) {
  console.log("data:  "+data.id+"--->"+data.positionName);
  return request({
    url: `/json/position/update?id=${data.id}&positionName=${data.positionName}`,
    method: 'put',
  })
}
