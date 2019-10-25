import request from '@/utils/request'
import qs from 'qs'
//显示所有产品信息
export function getProductList(params) {
  return request({
    url: '/product/searchProduct',
    method: 'get',
    params
  })
}

//查看某个产品的详情
export function getProductDetail(params){
  return request({
    url: '/product/listDetailById',
    method: 'get',
    params
  })
}

//查看成交产品详情
export function getDeal(params){
  return request({
    url: '/product/listTradedProducts',
    method: 'get',
    params
  })
}
//获取某个产品产品信息
export function getOneProduct(params){
  return request({
    url: '/product/listById',
    method: 'get',
    params
  })
}

//根据上一级id查询下一级产品类别，第一级上一级别id是0
export function getClassById(params){
  return request({
    url: '/productClass/listByPreId',
    method: 'get',
    params
  })
}
//获取所有类别
export function getAllClass(params){
  return request({
    url: '/productClass/listAll',
    method: 'get',
    params
  })
}
//获取产品单位
export function getSaleUnit(params){
  return request({
    url: '/saleUnit/listAll',
    method: 'get',
    params
  })
}

//批量删除产品
export function deleteProduct(params){
  return request({
    url: '/product/delete',
    method: 'delete',
    data:params
  })
}

//添加产品
export function createProduct(params){
  return request({
    url: '/product/create',
    method: 'post',
    data:params
  })
}

//修改产品
export function updateProduct(params){
  return request({
    url: '/product/update',
    method: 'post',
    data:params
  })
}

//修改产品类别
export function updateClass(params){
  return request({
    url: '/productClass/update',
    method: 'put',
    data:params
  })
}
//添加产品类别
export function createClass(params){
  return request({
    url: '/productClass/create',
    method: 'post',
    data:params
  })
}
//删除产品类别
export function deleteClass(params){
  return request({
    url: '/productClass/delete',
    method: 'delete',
    params
  })
}
//修改销售单位
export function updateUnit(params){
  return request({
    url: '/saleUnit/update',
    method: 'put',
    data:params
  })
}
//添加销售单位
export function createUnit(params){
  return request({
    url: '/saleUnit/create',
    method: 'post',
    data:params
  })
}

//删除销售单位
export function deleteUnit(params){
  return request({
    url: '/saleUnit/delete',
    method: 'delete',
    params
  })
}

//获取产品销量信息
export function getSaleStatist(params){
  return request({
    url: '/product/listSaleStatistic',
    method: 'get',
    params
  })
}