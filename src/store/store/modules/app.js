const state = {
  isQianKun: false,
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  device: 'desktop',
  contentLoading: false, // 内容区域loading
  wholePageLoading: false, // 整个页面loading
  hiddenOther: false // 隐藏侧边栏和顶部栏
}

const mutations = {
  CHANGE_QIANKUN(state, bool) {
    state.isQianKun = bool
  },
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
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
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
