import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  /**
   * 登录
   */
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  /**
   * 错误
   */
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  /**
   * 首页
   */
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  /**
   * CRM
   * 包括全部客户、我的客户、跟进计划、跟进任务、客户跟进和客户投诉
   */
  {
    path:'/crm',
    component:Layout,
    redirect:'/crm/allcustomer',
    name:"CRM",
    meta:{title:'CRM',icon:'all'},
    children:[
      {
        path: 'allcustomer',
        component: () => import('@/views/crm/allcustomers/index'),
        name: 'Allcustomer',
        meta: { title: '全部客户'}
      },
      {
        path: 'mycustomer',
        component: () => import('@/views/crm/mycustomers/index'),
        name: 'Mycustomer',
        meta: { title: '我的客户'}
      },
      {
        path: 'follow',
        component: () => import('@/views/crm/contact-follow/index'),
        name: 'Follow',
        meta: { title: '联系跟进' }
      },
      {
        path: 'plan',
        component: () => import('@/views/crm/follow-plan/index'),
        name: 'Plan',
        meta: { title: '跟进计划' }
      },
      {
        path: 'task',
        component: () => import('@/views/crm/follow-task/index'),
        name: 'Task',
        meta: { title: '跟进任务' }
      },
      {
        path: 'complaint',
        component: () => import('@/views/crm/complaint/index'),
        name: 'Complaint',
        meta: { title: '客户投诉' }
      },
      
    ]
  },
  /**
   * 客户详情
   */
  {
    path: '/customerDetail',
    component: Layout,
    children: [
      {
        path: 'customerDetail',
        name: 'CustomerDetail',
        component: () => import('@/views/public/customer/all-detail/index'),
        meta: { title: '客户详情', icon: 'product' },
        hidden:true
      }
    ]
  },
  /**
   * 产品
   *
   */
  {
    path: '/product',
    component: Layout,
    children: [
      {
        path: 'product',
        name: 'Product',
        component: () => import('@/views/product/index'),
        meta: { title: '产品管理', icon: 'product' }
      }
    ]
  },
  {
    path: '/productDetail',
    component: Layout,
    children: [
      {
        path: 'productDetail',
        name: 'ProductDetail',
        component: () => import('@/views/product/show-detail/index'),
        meta: { title: '产品详情', icon: 'product' },
        hidden:true
      }
    ]
  },
   /**
   *
   * 包括成交订单、订单回款、订单退款和费用开支
   */
  {
    path:'/financial',
    component:Layout,
    name:'Financial',
    redirect:'/financial/order',
    meta:{title:'财务',icon:'finance'},
    children:[
      {
        path: 'order',
        component: () => import('@/views/finance/success-order/index'),
        name: 'Order',
        meta: { title: '成交订单' }
      },
      {
        path: 'payback',
        component: () => import('@/views/finance/return/index'),
        name: 'Payback',
        meta: { title: '回款管理' }
      },
      // {
      //   path: 'plan',
      //   component: () => import('@/views/finance/plan/index'),
      //   name: 'Plan',
      //   meta: { title: '回款计划' }
      // },
      {
        path: 'refund',
        component: () => import('@/views/finance/refund/index'),
        name: 'Refund',
        meta: { title: '退款管理' }
      },
      // {
      //   path: 'expenses',
      //   component: () => import('@/views/finance/expenses/index'),
      //   name: 'Expenses',
      //   meta: { title: '费用开支' }
      // }
    ]
  },
   /**
   * 个人中心
   * 包括内部消息、个人信息、密码管理
   */
  {
    path:'/personal',
    name:'Personal',
    component:Layout,
    meta:{title:'个人中心',icon:'personal'},
    children:[
      {
        path:'message',
        name:'Message',
        component:()=>import('@/views/personal-center/inner-info/index'),
        meta:{title:'内部消息'},
      },
      {
        path:'info',
        name:'Info',
        component:()=>import('@/views/personal-center/personal-info/index'),
        meta:{title:'个人信息'},
      },
      {
        path:'pwd',
        name:'PWD',
        component:()=>import('@/views/personal-center/password/index'),
        meta:{title:'密码管理'},
      },
    ]
  },
   /**
   * 管理中心
   * 包括职位与权限、部门与员工
   */
  {
    path: '/manage',
    component: Layout,
    meta:{title:'管理中心',icon:'manage'},
    children: [
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/manage/permission/index'),
        meta: { title: '职位权限管理' }
      },
      {
        path: 'dept',
        name: 'Dept',
        component: () => import('@/views/manage/employees/index'),
        meta: { title: '部门与员工' }
      }
    ]
  },
    /**
   * 统计
   * 包括客户统计、订单统计、产品统计
   */
  {
    path:'/count',
    component:Layout,
    redirect:'/count/customer',
    name:'count',
    meta:{title:'统计',icon:'statistics'},
    children:[
      {
        path:'customer',
        name:'Customer',
        component:()=>import('@/views/statistics/customers/index'),
        meta:{title:'客户统计'},
        children:[
          {
            path:'add',
            name:'add',
            component:()=>import('@/views/statistics/customers/add/index'),
            meta:{title:'按时间统计新增客户'},
          },
          {
            path:'followCustomer',
            name:'FollowCustomer',
            component:()=>import('@/views/statistics/customers/follow-customer/index'),
            meta:{title:'按时间统计跟进客户数'},
          },
          {
            path:'followRecords',
            name:'FollowRecords',
            component:()=>import('@/views/statistics/customers/follow-records/index'),
            meta:{title:'按时间统计跟进记录数'},
          }
        ]
      },
      {
        path:'order',
        name:'Order',
        component:()=>import('@/views/statistics/order/index'),
        meta:{title:'订单统计'},
      },
      {
        path:'product',
        name:'Product',
        component:()=>import('@/views/statistics/product/index'),
        meta:{title:'产品统计'},
        children:[
          {
            path:'productClass',
            name:'ProductClass',
            component:()=>import('@/views/statistics/product/productClass/index'),
            meta:{title:'产品分类统计'},
          },
          {
            path:'productName',
            name:'ProductName',
            component:()=>import('@/views/statistics/product/productName/index'),
            meta:{title:'产品名统计'},
          }
        ]
      },
    ]

  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
