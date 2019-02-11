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
      path: '/news',
      component: resolve => require(['@/pages/Main.vue'], resolve),
      meta: {
        showMenu:true,
        title: '内容管理'
      },
      children: [
        {
          path:'list',
          name:'newslist',
          component: resolve => require(['./list'], resolve),
          meta: {
            showMenu:true,
            title: '文章管理'
          },
        },
        {
          path:'modify/:id',
          name:'newsmodify',
          component: resolve => require(['./modify'], resolve),
          props:true,
          meta: {
            title: '文章管理'
          },
        },
        {
          path:'add',
          name:'newsadd',
          component: resolve => require(['./add'], resolve),
          props:true,
          meta: {
            title: '文章管理'
          },
        }
      ]
    }
  ]
}
