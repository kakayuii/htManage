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
      path: '/case',
      component: resolve => require(['@/pages/Main.vue'], resolve),
      meta: {
        showMenu:true,
        title: '内容管理'
      },
      children: [
        {
          path:'list',
          name:'caselist',
          component: resolve => require(['./list'], resolve),
          meta: {
            showMenu:true,
            title: '案例管理'
          },
        },
        {
          path:'modify/:id',
          name:'casemodify',
          component: resolve => require(['./modify'], resolve),
          props:true,
          meta: {
            title: '案例管理'
          },
        },
        {
          path:'add',
          name:'caseadd',
          component: resolve => require(['./add'], resolve),
          props:true,
          meta: {
            title: '案例管理'
          },
        }
      ]
    }
  ]
}
