const StyleLintPlugin = require('stylelint-webpack-plugin')
const { name } = require('./package.json')

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: process.env.NODE_ENV !== 'production', // 生产环境的SourceMap
  // CSS 相关选项
  // css: {
  //   // // 为预处理器的 loader 传递自定义选项。比如传递给
  //   // // sass-loader 时，使用 `{ sass: { ... } }`。
  //   loaderOptions: {
  //     scss: {
  //       additionalData: `@import "~@/styles/element-variables.scss";`
  //     }
  //   }
  // },

  // arallel: require('os').cpus().length > 1,

  // 配置 webpack-dev-server 行为。
  devServer: {
    open: true,
    // host: '192.168.35.218',
    // port: port,
    port: 3999,
    https: false,
    hotOnly: true,
    // proxy: 'https://aloha-qa.walmartmobile.cn',
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
    if (process.env.NODE_ENV !== 'production') {
      // 调试显示错误位置
      config.devtool = 'eval-source-map'
    }
    config.resolve.fallback = {
      crypto: false,
      path: require.resolve('path-browserify'),
      stream: false
    }
  },
  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 全局变量文件路径，支持string和array，全局文件无需引入变量文件即可使用变量
          resources: ['./src/styles/element-variables.scss', './src/styles/mixin.scss']
        })
        .end()
    })
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
