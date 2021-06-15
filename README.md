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


#### 提交git代码暂存区需要使用 package.json的cz命令，因为有对注释格式的校验，cz命令会格式化注释
~~~bash
  git add .
  yarn cz
  git push
~~~
