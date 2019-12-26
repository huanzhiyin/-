import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/',
      component: () => import('../components/common/Base.vue'),
      meta: {
        title: '公共部分'
      },
      children: [
        {
          path: '/index',
          component: () => import('../views/Home.vue'),
          meta: {
            title: '系统首页'
          }
        },
        {
          path: '/chart-simple',
          component: () => import('../views/EchartsSimple.vue'),
          meta: {
            title: '简单图表'
          }
        },
        {
          path: '/chart-complex',
          component: () => import('../views/EchartsComplex.vue'),
          meta: {
            title: '复杂图表'
          }
        },
        {
          path: '/tab',
          component: () => import('../views/Tab.vue'),
          meta: {
            title: 'tab选项卡'
          }
        },
        {
          path: '/table',
          component: () => import('../views/Table.vue'),
          meta: {
            title: '表格'
          }
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/error',
      component: () => import('../views/Error.vue')
    },
    {
      path: '/404',
      component: () => import('../views/404.vue')
    }
  ]
})
