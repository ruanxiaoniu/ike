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
    redirect:'/crm/allcustomers',
    name:"CRM",
    meta:{title:'CRM',icon:'all'},
    children:[
      {
        path: 'allcustomers',
        component: () => import('@/views/crm/allcustomers/index'),
        name: 'Allcustomers',
        meta: { title: '全部客户'}
      },
      {
        path: 'mycustomers',
        component: () => import('@/views/crm/mycustomers/index'),
        name: 'Mycustomers',
        meta: { title: '我的客户'}
      },
      {
        path: 'contact-follow',
        component: () => import('@/views/crm/contact-follow/index'),
        name: 'Contact-Follow',
        meta: { title: '联系跟进' }
      },
      {
        path: 'follow-plan',
        component: () => import('@/views/crm/follow-plan/index'),
        name: 'Follow-Plan',
        meta: { title: '跟进计划' }
      },
      {
        path: 'follow-task',
        component: () => import('@/views/crm/follow-task/index'),
        name: 'Follow-Task',
        meta: { title: '跟进任务' }
      },
      {
        path: 'complaint',
        component: () => import('@/views/crm/complaint/index'),
        name: 'Complaint',
        meta: { title: '客户投诉' }
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
        path: 'index',
        name: 'Product',
        component: () => import('@/views/product/index'),
        meta: { title: '产品管理', icon: 'product' }
      }
    ]
  },
   /**
   * CRM
   * 包括成交订单、订单回款、订单退款和费用开支
   */
  {
    path:'/finance',
    component:Layout,
    name:'Finance',
    redirect:'/finance/success-order',
    meta:{title:'财务',icon:'finance'},
    children:[
      {
        path: 'success-order',
        component: () => import('@/views/finance/success-order/index'),
        name: 'Success-Order',
        meta: { title: '成交订单' }
      },
      {
        path: 'return',
        component: () => import('@/views/finance/return/index'),
        name: 'Return',
        meta: { title: '订单回款' }
      },
      {
        path: 'refund',
        component: () => import('@/views/finance/refund/index'),
        name: 'Refund',
        meta: { title: '订单退款' }
      },
      {
        path: 'expenses',
        component: () => import('@/views/finance/expenses/index'),
        name: 'Expenses',
        meta: { title: '费用开支' }
      }
    ]
  },
   /**
   * 个人中心
   * 包括内部消息、个人信息、密码管理
   */
  {
    path:'/personal-center',
    name:'Personal-Center',
    component:Layout,
    meta:{title:'个人中心',icon:'personal'},
    children:[
      {
        path:'inner-info',
        name:'Inner-Info',
        component:()=>import('@/views/personal-center/inner-info/index'),
        meta:{title:'内部消息'},
      },
      {
        path:'personal-info',
        name:'Personal-Info',
        component:()=>import('@/views/personal-center/personal-info/index'),
        meta:{title:'个人信息'},
      },
      {
        path:'password',
        name:'Password',
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
        path: 'permission',
        name: 'Permission',
        component: () => import('@/views/manage/permission/index'),
        meta: { title: '职位权限管理' }
      },
      {
        path: 'employees',
        name: 'Employees',
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
    path:'/statistics',
    component:Layout,
    redirect:'/statistics/customers',
    name:'Statistics',
    meta:{title:'统计',icon:'statistics'},
    children:[
      {
        path:'customers',
        name:'Customers',
        component:()=>import('@/views/statistics/customers/index'),
        meta:{title:'客户统计'},
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
      },
    ]

  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
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