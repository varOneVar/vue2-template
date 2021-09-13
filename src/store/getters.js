export default {
  storeId: (state) => state.user.storeId,
  userId: (state) => (state.user.userInfo || {}).userId,
  appId: (state) => state.user.appId,
  userInfo: (state) => state.user.userInfo,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  roles: (state) => state.user.roles,
  hasAuth: (state) => (needRoles) => needRoles.some((v) => state.user.roles.includes(v)),
  userName: (state) => (state.user.userInfo || {}).userName,
  accessedRoutes: (state) => state.user.accessedRoutes
}
