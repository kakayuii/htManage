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
    title: '爱记忆管理'
  },
  children: [
    {
      path: '/love',
      component: resolve => require(['@/pages/Main.vue'], resolve),
      meta: {
        showMenu:true,
        title: '门店管理'
      },
      children: [
        {
          path:'domainlist',
          name:'lovedomainlist',
          component: resolve => require(['./domainlist'], resolve),
          meta: {
            showMenu:true,
            title: '爱记忆门店管理'
          },
        },
        {
          path:'domainadd',
          name:'lovedomainadd',
          component: resolve => require(['./domainadd'], resolve),
          meta: {
            title: '门店新增'
          },
        },
        {
          path:'domainmodify/:id',
          name:'lovedomainmodify',
          component: resolve => require(['./domainmodify'], resolve),
          props:true,
          meta: {
            title: '门店新增'
          },
        }
      ]
    },
    {
      path: '/love',
      component: resolve => require(['@/pages/Main.vue'], resolve),
      meta: {
        showMenu:true,
        title: '问题管理'
      },
      children: [
        {
          path:'questionlist',
          name:'lovequestionlist',
          component: resolve => require(['./questionlist'], resolve),
          meta: {
            showMenu:true,
            title: '提问管理'
          },
        },
        {
          path:'questioncommit/:id',
          name:'lovequestioncommit',
          component: resolve => require(['./questioncommit'], resolve),
          props:true,
          meta: {
            title: '提问处理'
          },
        }
      ]
    },
    {
      path: '/love',
      component: resolve => require(['@/pages/Main.vue'], resolve),
      meta: {
        showMenu:true,
        title: '常见问题'
      },
      children: [
        {
          path:'commonProblems',
          name:'commonProblems',
          component: resolve => require(['./commonProblems'], resolve),
          meta: {
            showMenu:true,
            title: '常见问题'
          },
        },
      ]
    }
  ]
}
