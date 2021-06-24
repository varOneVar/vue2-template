const state = {
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some((v) => v.path === view.path)) return
    state.visitedViews.push({ ...view, title: view.meta.title || 'no-name' })
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },

  DEL_VISITED_VIEW: (state, view) => {
    // eslint-disable-next-line no-unused-vars
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW: (state, view) => {
    // eslint-disable-next-line no-unused-vars
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews.splice(index, 1)
        break
      }
    }
  },

  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter((v) => {
      return v.meta.affix || v.path === view.path
    })
  },
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    // eslint-disable-next-line no-unused-vars
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews = state.cachedViews.slice(index, index + 1)
        break
      }
    }
  },

  DEL_ALL_VISITED_VIEWS: (state) => {
    // keep affix tags
    const affixTags = state.visitedViews.filter((tag) => tag.meta.affix)
    state.visitedViews = affixTags
  },
  DEL_ALL_CACHED_VIEWS: (state) => {
    state.cachedViews = []
  },

  UPDATE_VISITED_VIEW: (state, view) => {
    // eslint-disable-next-line no-unused-vars
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

const actions = {
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },

  async delView({ dispatch, state }, view) {
    dispatch('delVisitedView', view)
    dispatch('delCachedView', view)
    return {
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews]
    }
  },
  async delVisitedView({ commit, state }, view) {
    commit('DEL_VISITED_VIEW', view)
    return [...state.visitedViews]
  },
  async delCachedView({ commit, state }, view) {
    commit('DEL_CACHED_VIEW', view)
    return [...state.cachedViews]
  },

  async delOthersViews({ dispatch, state }, view) {
    dispatch('delOthersVisitedViews', view)
    dispatch('delOthersCachedViews', view)
    return {
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews]
    }
  },
  async delOthersVisitedViews({ commit, state }, view) {
    commit('DEL_OTHERS_VISITED_VIEWS', view)
    return [...state.visitedViews]
  },
  async delOthersCachedViews({ commit, state }, view) {
    commit('DEL_OTHERS_CACHED_VIEWS', view)
    return [...state.cachedViews]
  },

  async delAllViews({ dispatch, state }, view) {
    dispatch('delAllVisitedViews', view)
    dispatch('delAllCachedViews', view)
    return {
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews]
    }
  },
  async delAllVisitedViews({ commit, state }) {
    commit('DEL_ALL_VISITED_VIEWS')
    return [...state.visitedViews]
  },
  async delAllCachedViews({ commit, state }) {
    commit('DEL_ALL_CACHED_VIEWS')
    return [...state.cachedViews]
  },

  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
