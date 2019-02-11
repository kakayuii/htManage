const state = {
  menuCollapse: false, // 菜单栏控制器
  breadcrumbs: [], // 面包屑
  userInfo: null,
  visitedViews: []
}

const mutations = {

  /**
   * 保存用户登录态
   * @param state
   * @param userInfo
   */
  updateUserInfo: function (state, userInfo) {
    state.userInfo = userInfo
  },
  /**
   * 更新头部面部屑
   * @param state
   */
  updateBreadcrumbs: function (state, breadcrumbList) {
    state.breadcrumbs = breadcrumbList
  },
  /**
   * 菜单栏状态 更改时间
   * @param state
   */
  triggerCollapse: function (state) {
    state.menuCollapse = !state.menuCollapse
  },
  /**
   * 添加标签
   * @param state
   * @param view
   */
  addViews: function (state, view) {
    if (state.visitedViews.some(v => v.path == view.path)) {
    } else {
      state.visitedViews.push(view)
    }
  },
  /**
   * 删除标签
   * @param state
   * @param index 标签位置
   */
  deleteViews: function (state, index) {
    state.visitedViews.splice(index,1)
  }
}
export default {
  state,
  mutations
}
