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
      path: '/activities',
      component: resolve => require(['@/pages/Main.vue'], resolve),
      meta: {
        showMenu:true,
        title: '内容管理'
      },
      children: [
        {
          path:'list',
          name:'activitieslist',
          component: resolve => require(['./list'], resolve),
          meta: {
            showMenu:true,
            title: '活动管理'
          },
        },
        {
          path:'modify/:id',
          name:'activitiesmodify',
          component: resolve => require(['./modify'], resolve),
          props:true,
          meta: {
            title: '活动管理'
          },
        },
        {
          path:'enrolllist/:id',
          name:'activitiesenrolllist',
          component: resolve => require(['./enrolllist'], resolve),
          props:true,
          meta: {
            title: '活动报名管理'
          },
        },
      ]
    }
  ]
}
