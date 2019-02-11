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
      path: '/feedback',
      component: resolve => require(['@/pages/Main.vue'], resolve),
      meta: {
        publish:true,
        showMenu:true,
        title: '反馈管理'
      },
      children: [
        {
          path: 'list',
          name: 'feedbacklist',
          component: resolve => require(['./list'], resolve),
          meta: {
            showMenu:true,
            publish:true,
            title: '反馈管理',
            keepAlive:true,
          },
        },
        {
          path:'view/:id',
          name:'feedbackView',
          component: resolve => require(['./view'], resolve),
          meta: {
            title: '意见列表'
          },
        }
      ]
    },
    // {
    //   path: '/domain',
    //   component: resolve => require(['@/pages/Main.vue'], resolve),
    //   meta: {
    //     showMenu:true,
    //     title: '门店管理'
    //   },
    //   children: [
    //     {
    //       path: '/taglist',
    //       component: resolve => require(['@/pages/feedback/domain/taglist'], resolve),
    //       meta: {
    //         showMenu:true,
    //         title: '反馈列表'
    //       },
    //     },
    //   ]
    // },
  ]
}
