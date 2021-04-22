const StyleLintPlugin = require('stylelint-webpack-plugin')
const { name } = require('./package.json')

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  runtimeCompiler: true,
  filenameHashing: true,
  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    extract: true,

    // 是否开启 CSS source map？
    sourceMap: false

    // // 为预处理器的 loader 传递自定义选项。比如传递给
    // // sass-loader 时，使用 `{ sass: { ... } }`。
    // loaderOptions: {
    // 	sass: {
    // 		prependData: [
    // 			`@import "~@/styles/utils.scss";`
    // 		].join('\n')
    // 	}
    // },
  },

  // arallel: require('os').cpus().length > 1,

  // 配置 webpack-dev-server 行为。
  devServer: {
    open: true,
    // host: '192.168.35.218',
    // port: port,
    port: 3999,
    https: false,
    hotOnly: true,
    // headers: {
    // 	'Access-Control-Allow-Origin': '*'
    // },
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
    // proxy: {
    //   '/user-center': {
    // 		target: 'https://aloha-qa.walmartmobile.cn', // 登陆
    // 		changeOrigin: true,
    // 		ws: false
    // 	},
    // 	'/mcCmsServer/': {
    // 		// target: 'https://aloha-qa.walmartmobile.cn',
    // 		ws: false,
    // 		target: 'http://192.168.35.92:8089',
    // 		changeOrigin: true
    // 		// pathRewrite: {
    // 		//   ['^' + process.env.VUE_APP_BASE_API]: ''
    // 		// }
    //   }
    // },
    headers: {
      // 本地必须要开启代理，不然主应用与子应用有跨域
      'Access-Control-Allow-Origin': '*'
    }
    // proxy: process.env.VUE_APP_PORTAL_URL
  },
  configureWebpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.output.library = `${name}-[name]`
    // eslint-disable-next-line no-param-reassign
    config.output.libraryTarget = 'umd'
  },
  chainWebpack: (config) => {
    config.plugin('stylelint').use(StyleLintPlugin, [
      {
        // 指定检测的文件
        files: ['./src/**/*.{vue,css,less,scss,styl}'],
        // 启动自动修复
        fix: true,
        cache: true // 启用缓存
      }
    ])
  }
}
