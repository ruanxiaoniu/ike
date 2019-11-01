import request from '@/utils/request'

export function login(data) {
  // return request({
  //   url: '/user/login',
  //   method: 'post',
  //   data
  // })
  console.log(data)

  return request({
    url: `/Authen/login?name=${data.username}&pwd=${data.password}`,
    method: 'post',
    // data:JSON.stringify(data)
  })
}
export function getInfo(token) {
  return request({
    url: '/Authen/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: `/Authen/logout`,
    method: 'get'
  })
}

export function  sendAuthCode(data) {
  console.log("email: "+data);
  return request({
    url: `/Authen/getAuthCode?toEmail=${data}`,
    method: 'get'
  })
}

export function  checkAuthCode(data) {
  console.log("code: "+data);
  return request({
    url: `/Authen/checkAuthCode?InputAuthCode=${data}`,
    method: 'get'
  })
}

export function  findPwd(data) {
  console.log("code: "+data);
  return request({
    url: `/Authen/findPwd?newPwd=${data}`,
    method: 'put'
  })
}
//个人信息
export function getPerson(params){
  return request({
    url: '/json/user/getDetail',
    method: 'get',
    params
  })
}

//修改个人信息
export function updatePerson(params){
  return request({
    url: '/json/user/update',
    method: 'put',
    data:params
  })
}