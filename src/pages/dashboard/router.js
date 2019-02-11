/**
 * Created by felix on 2018/9/19.
 */

/**
 *  dashboard
 * @type {{path: string, component: (function(*=): *), meta: {title: string}, children: *[]}}
 */
export default {
  path: '/',
  component: resolve => require(['@/pages/Home.vue'], resolve),
  meta: {
    showMenu:false,
    title: '内容管理'
  },
  children: [
    {
      path: '/Home',
      redirect: '/dashboard',
      component: resolve => require(['@/pages/Main.vue'], resolve),
      meta: {
        showMenu:false,
        title: '首页'
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: resolve => require(['@/pages/dashboard/Dashboard.vue'], resolve),
          meta: {
            showMenu:false,
            title: 'dashboard'
          }
        }
      ]
    }
  ]
}
