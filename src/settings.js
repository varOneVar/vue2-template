import packageJson from '../package.json'

export default {
  appName: packageJson.name,
  appVersion: packageJson.version,
  appTitle: '工程模板',
  appId: 'aaaaa',
  // 是否开启超时检测： 当跳转路由，调用接口时，检查是否长时间未操作，满足条件即定性为超时，会跳转登录页
  checkTimeoutOptions: {
    open: false,
    time: 120 * 60 * 1000 // 120分钟
  },
  sidebarLogo: true // 是否在菜单上方显示logo
}
