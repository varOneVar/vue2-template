import {
  API_getUserByToken,
  API_getAuthorities,
  API_loginOut,
  API_checkToken,
  API_getUserByUserId
} from '@/api/user'
import { goLoginPortal } from '@/utils/client-info'
import { getResourcesList, filterAsyncRoutes } from '@/utils/login-manage'
import { MessageBox, Message } from 'element-ui'
import storage from 'good-storage'
import { resetRouter } from '@/router'
import asyncRoutes from '@/router/asyncRoutes'
import settings from '@/settings'
// 失败重新登录处理
function failDispose(str, commit) {
  MessageBox.alert(str, '提示', {
    confirmButtonText: '确定',
    showClose: false,
    type: 'warning',
    callback() {
      storage.session.remove('checkToken_time')
      commit('CLEAR_USER_DATA')
      goLoginPortal() // 重新前往登录页
    }
  })
}

const state = {
  storeId: '', // 门店号
  userId: '', // 用户id
  userName: '', // 用户名称
  userInfo: null, // 用户信息
  userRoles: null, // 用户权限汇总
  resources: [], // 用户资源列表
  roles: [], // 权限id数组
  accessedRoutes: asyncRoutes, // 权限路由
  token: '', // token
  appId: settings.appId // 应用id
}

const mutations = {
  CHANGE_STORE_ID(state, str) {
    state.storeId = str
  },
  CHANGE_USER_ID(state, str) {
    state.userId = str
  },
  CHANGE_USER_INFO(state, obj) {
    state.userInfo = obj
  },
  CHANGE_RESOURCES(state, arr) {
    state.resources = arr || []
  },
  CHANGE_ROLES(state, arr) {
    state.roles = arr || []
  },
  CHANGE_ACCESSED_ROUTERS(state, arr) {
    state.accessedRoutes = arr || []
  },
  CHANGE_USER_ROLES(state, obj) {
    state.userRoles = obj
  },
  CHANGE_USER_NAME(state, obj) {
    state.userName = obj
  },
  CHANGE_APP_ID(state, str) {
    state.appId = str
  },
  CHANGE_TOKEN(state, str) {
    state.token = str
  },
  CLEAR_USER_DATA(state) {
    state.storeId = ''
    state.userId = ''
    state.token = ''
    state.userName = ''
    state.userInfo = null
    state.userRoles = null
    state.resources = []
    state.accessedRoutes = []
    state.roles = []
    state.appId = settings.appId
  }
}
const actions = {
  // 对token要用这个，统一登录平台都是token
  async loginOutByToken({ commit, state }) {
    try {
      const { code } = await API_loginOut({
        token: state.token
      })
      if (code === '0') {
        commit('CLEAR_USER_DATA')
        goLoginPortal() // 重新前往登录页
      } else {
        Message.error('退出失败！')
      }
    } catch (error) {
      console.log(error)
    }
  },
  // 拿到的数据有id,userid,name,appid(这个不准)
  async getUserInfoByToken({ commit, dispatch, state }) {
    try {
      const { code, result } = await API_getUserByToken({
        token: state.token
      })
      if (code === '0') {
        commit('CHANGE_USER_NAME', result.name)
        commit('CHANGE_USER_ID', result.userId)
        const resArr = await Promise.all([
          dispatch('getUserInfoByUserId'),
          dispatch('findAuthorities')
        ])
        const isBad = resArr.some((v) => !v)
        isBad && failDispose('您未被授权访问此系统！', commit)
        return !isBad
      }
      failDispose('获取用户信息失败，请重新登录！', commit)
    } catch (error) {
      console.log(error)
    }
  },
  // 根据UserId拿取用户信息，比较全的用户信息
  async getUserInfoByUserId({ commit, state }) {
    try {
      const { code, result } = await API_getUserByUserId({
        userId: state.userId
      })
      if (code === '0') {
        commit('CHANGE_USER_INFO', result)
        commit('CHANGE_STORE_ID', result.storeId)
        return true
      }
      failDispose('获取用户信息失败，请重新登录！', commit)
    } catch (error) {
      console.log(error)
    }
  },
  // 权限设置
  async findAuthorities({ commit, state }) {
    try {
      const { code, result } = await API_getAuthorities({
        appIds: [state.appId],
        userId: state.userId
      })
      if (code === '0') {
        // storage.session.set('checkToken_time', Date.now())
        const data = {}
        data.ruleList = getResourcesList(result)
        if (data.ruleList && data.ruleList.length > 0) {
          commit('CHANGE_RESOURCES', data.ruleList)
          data.scopeMap = result.scopeMap
          commit('CHANGE_USER_ROLES', data)
          const roles = data.ruleList.map((v) => v.code)
          commit('CHANGE_ROLES', roles)
          // 有chidren但是children没有长度的就过滤掉
          const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles).filter(
            (v) => !v.children || (v.children && v.children.length)
          )
          commit('CHANGE_ACCESSED_ROUTERS', accessedRoutes)
          resetRouter(accessedRoutes)
          return true
        }
        // failDispose('您未被授权访问此系统！', commit)
        return false
      }
      return false
    } catch (error) {
      console.log(error)
    }
  },
  // 监测token是否失效，失效返回true
  async checkTokenIsFailure({ commit, state }) {
    try {
      const { code } = await API_checkToken({
        token: state.token
      })
      if (code !== '0') {
        // 检查
        failDispose('当前TOKEN已失效，请重新登录！', commit)
        return true
      }
      storage.session.remove('checkToken_time')
      storage.session.set('checkToken_time', Date.now())
      return false
    } catch (error) {
      console.log(error)
    }
  },
  fromQianKunData({ commit }, data = {}) {
    commit('CHANGE_STORE_ID', data.storeId)
    commit('CHANGE_USER_NAME', data.userName)
    commit('CHANGE_USER_ID', data.userId)
    commit('CHANGE_TOKEN', data.token)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
