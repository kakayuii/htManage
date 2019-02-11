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
      path: '/user',
      component: resolve => require(['@/pages/Main.vue'], resolve),
      meta: {
        showMenu:true,
        title: '用户管理'
      },
      children: [
        {
          path:'list',
          name:'usersyslist',
          component: resolve => require(['./list'], resolve),
          meta: {
            showMenu:true,
            title: '用户管理'
          },
        },
        {
          path:'modify/:id',
          name:'usersysmodify',
          component: resolve => require(['./modify'], resolve),
          props:true,
          meta: {
            title: '用户管理'
          },
        }
        ,
        {
          path:'chgpsw/:id',
          name:'usersyschgpwd',
          component: resolve => require(['./chgpwd'], resolve),
          props:true,
          meta: {
            title: '用户管理'
          },
        }
      ]
    }
  ]
}
