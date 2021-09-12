/*
 * @Author: Song Qing
 * @Date: 2021-06-17 11:10:36
 * @LastEditTime: 2021-09-12 22:41:01
 * @LastEditor: Song Qing
 * @Description: 权限路由，根据接口返回的角色做处理
 * @FilePath: \vue2-template\src\router\asyncRoutes.js
 */

import Layout from '@/layout'
// import emptyPage from '@/views/system/emptyPage'

export default [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/workbench/MyHome'),
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/test1',
    component: Layout,
    redirect: '/test1/index',
    name: 'test1',
    children: [
      {
        path: '/test1/index',
        hidden: true,
        component: () => import('@/views/workbench/MyHome'),
        meta: { title: '首页' }
      },
      {
        path: '/test1/index1',
        hidden: true,
        component: () => import('@/views/workbench/MyHome'),
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/test2',
    component: Layout,
    redirect: '/test2',
    name: 'test2',
    children: [
      {
        path: 'index',
        component: () => import('@/views/workbench/MyHome'),
        meta: { title: 'index' },
        children: [
          {
            path: 'okk',
            component: () => import('@/views/workbench/MyHome'),
            meta: { title: 'okk' }
          },
          {
            path: '/okk2',
            component: () => import('@/views/workbench/MyHome'),
            meta: { title: 'okk2' }
          }
        ]
      }
    ]
  }
]
