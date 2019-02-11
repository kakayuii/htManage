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
      path: '/domain',
      component: resolve => require(['@/pages/Main.vue'], resolve),
      meta: {
        showMenu:true,
        title: '门店管理'
      },
      children: [

        {
          path:'taglist',
          name:'domaintaglist',
          component: resolve => require(['./taglist'], resolve),
          meta: {
            showMenu:true,
            title: '门店标签管理'
          },
        },
        {
          path:'list',
          name:'domainlist',
          component: resolve => require(['./list'], resolve),
          meta: {
            showMenu:true,
            title: '门店管理'
          },
        },
        {
          path:'addDomain',
          component: resolve => require(['./addDomain'], resolve),
          meta: {
            title: '新增、编辑门店'
          },
        },

      ]
    }
  ]
}
