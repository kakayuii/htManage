/**
 * Created by felix on 2018/9/19.
 */

/**
 *  feedback
 * @type {{path: string, component: (function(*=): *), meta: {title: string}, children: *[]}}
 */
export default {
  path: '/',
  component: resolve => require(['@/pages/Home.vue'], resolve),
  meta: {
    showMenu:true,
    title: '系统管理'
  },
  children: [
    {
      path: '/appointment',
      component: resolve => require(['@/pages/Main.vue'], resolve),
      meta: {
        showMenu:true,
        title: '预约管理'
      },
      children: [
        {
          path:'list',
          name:'appointmentList',
          component: resolve => require(['./list'], resolve),
          meta: {
            showMenu:true,
            title: '预约管理'
          },
        },


      ]
    }
  ]
}
