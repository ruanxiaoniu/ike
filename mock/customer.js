import Mock from 'mockjs'

const data = Mock.mock({
  'all_list|30': [{
    customer_name: 'customer_name',
    customer_state: '@integer(1, 10)',
    'status|1': ['published', 'draft', 'deleted'],
    customer_stage: '@integer(1, 10)',
    customer_level:'@integer(1, 10)',
    customer_origin:'客户来源',
    relation_primary:'主联系手机号',
    landline_number:'主联系座机号',
    employee:'负责人',
    end_follow: '@datetime',
  }],
 
})

export default [
  {
    url: '/customer/allList',
    type: 'get',
    response: config => {
      const { page = 1, limit=20}=config.query
      const items = data.all_list
      const pageList = items.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      
      return {
        code: 20000,
        data: {
          total: items.length,
          items: pageList
        }
      }
    }
  },

]
