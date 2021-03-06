import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    product_name: 'product_name',
    customer_num: '@integer(1, 10)',
    'status|1': ['published', 'draft', 'deleted'],
    order_count: '@integer(1, 10)',
    total_price:'@integer(30, 500)',
    order_num:'@integer(1, 10)',
    cost:'@integer(30, 500)',
    profit:'@integer(30, 500)',
    create_user_id:'name',
    display_time: '@datetime',
    success_count: '@integer(1, 10)',
  }]
})

export default [
  {
    url: '/product/list',
    type: 'get',
    response: config => {
      const { page = 1, limit=20}=config.query
      const items = data.items
      const pageList = items.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      
      return {
        code: 20000,
        data: {
          total: items.length,
          items: pageList
        }
      }
    }
  }
]
