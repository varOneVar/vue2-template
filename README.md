# 模板文件

#### 涉及功能
 * eslint 格式校验
 * style 格式校验（格式与属性排序）
 * 提交代码自动检测格式 husky
 * git commit格式校验
 * 支持生成changelog， 使用yarn version或者npm run version命令
 * 支持mock数据， main.js中引入mock文件
 * 支持vuex数据持久化，使用sessionStorage缓存
 * axios拦截器支持数据缓存，断线重连，取消重复请求以及错误提示统一处理
 * 数据埋点上报
 * 前端xlsx文件生成
 * 二维码生成
 * 权限控制
 * 全局样式变量规范
 * table，form，upload，搜索条件组件等
 * 工具函数
 * log日志查看（设置特殊路由，通过页面展示，功能支持待定）

#### 公共组件（element ui基础上二次封装）
> 在尽量不影响原始element组件功能参数情况下，对常用功能组件配置化封装，省去开发时间成本

* Table：通过参数tableFormat传数据格式，tableData传递数据内容，快速生成table，另外根据配置可选择是否分页
* Form：封装formItem类型，支持嵌套（递归生成），不破坏原有规则校验


#### 提交git代码暂存区需要使用 package.json的cz命令，因为有对注释格式的校验，cz命令会格式化注释
~~~bash
  git add .
  yarn cz
  git push
  # 或者在vscode里调用 yarn vs-push
  # 使用git工具调用 yarn git-push
  # 区别在于git工具不是交互式命令，需要在命令前添加winpty来使用交互式命令行， vscode直接可以交互式，调用winpty会报错
~~~
