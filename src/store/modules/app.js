/*
 * @Author: Song Qing
 * @Date: 2021-06-17 10:00:49
 * @LastEditTime: 2021-06-17 13:38:02
 * @LastEditor: Song Qing
 * @Description:
 * @FilePath: \mobile-vue-vant\app-test\src\store\modules\app.js
 */
const store = {
  // 左侧菜单收缩
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  // 设备信息
  device: {
    type: 'desktop', // 'mobile', 'tablet', 'desktop', or 'unknown'
    orientation: 'landscape', // 'landscape', 'portrait', or 'unknown'
    os: 'windows' // 	'ios', 'iphone', 'ipad', 'ipod', 'android', 'blackberry', 'windows', 'macos', 'fxos', 'meego', 'television', or 'unknown'
  },
  contentLoading: false, // 内容区域loading
  wholePageLoading: false, // 整个页面loading
  hiddenOther: false // 隐藏侧边栏和顶部栏
}

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE_TYPE: (state, str) => {
    state.device.type = str
  },
  TOGGLE_DEVICE_OS: (state, str) => {
    state.device.os = str
  },
  TOGGLE_DEVICE_ORIENTATION: (state, str) => {
    state.device.orientation = str
  },
  SET_CONTENT_LOADING(state, bool) {
    state.contentLoading = bool
  },
  SET_WHOLE_PAGE_LOADING(state, bool) {
    state.wholePageLoading = bool
  },
  SET_HIDDEN_OTHER(state, bool) {
    state.hiddenOther = bool
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, { type, os, orientation }) {
    commit('TOGGLE_DEVICE_TYPE', type)
    commit('TOGGLE_DEVICE_ORIENTATION', orientation)
    commit('TOGGLE_DEVICE_OS', os)
  }
}

export default {
  namespaced: true,
  state: store,
  mutations,
  actions
}
