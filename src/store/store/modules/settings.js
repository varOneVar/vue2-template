import variables from '@/styles/element-variables.scss'
import settings from '@/settings'

const state = {
  theme: variables.theme,
  tagsView: false,
  fixedHeader: true,
  sidebarLogo: true,
  title: settings.title
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
