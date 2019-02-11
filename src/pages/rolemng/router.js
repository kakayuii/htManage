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
    title: '权限管理'
  },
  children: [
    {
      path: '/role',
      component: resolve => require(['@/pages/Main.vue'], resolve),
      meta: {
        showMenu:true,
        title: '菜单管理'
      },
      children: [
        {
          path: 'gwrole/list',
          name: 'gwrolelist',
          component: resolve => require(['./gwrolelist'], resolve),
          meta: {
            showMenu:true,
            title: '菜单角色管理'
          },
        },
        {
          path:'gwrole/modify/:id',
          name:'gwrolemodify',
          props:true,
          component: resolve => require(['./gwrolemodify'], resolve),
          meta: {
            title: '菜单角色管理'
          },
        }
      ]
    }
  ]
}
