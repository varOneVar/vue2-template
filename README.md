# 模板文件

#### 涉及功能
 * eslint 格式校验
 * style 格式校验（格式与属性排序）
 * 提交代码自动检测格式 husky
 * git commit格式校验


#### 提交git代码暂存区需要使用 package.json的cz命令，因为有对注释格式的校验，cz命令会格式化注释
git add .
yarn cz
git push
