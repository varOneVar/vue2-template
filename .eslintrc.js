/*
 * @Author: your name
 * @Date: 2021-04-20 10:53:34
 * @LastEditTime: 2021-08-17 23:39:31
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue2-template\vue2-template\.eslintrc.js
 */
const path = require('path')

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended', // 添加 prettier 插件
    'prettier'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 12,
    sourceType: 'module',
    babelOptions: {
      configFile: path.resolve(__dirname, './babel.config.js')
    }
    // parser: '@babel/eslint-parser'
  },
  plugins: ['vue', 'html', '@babel', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-param-reassign': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/no-multiple-template-root': 'off',
    'no-unused-expressions': 0,
    'vue/script-setup-uses-vars': 'off',
    'no-underscore-dangle': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? { allow: ['warn', 'error'] } : 0,
    'vue/order-in-components': [
      'warn',
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['directives', 'filters'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'fetch',
          'asyncData',
          'data',
          'methods',
          'LIFECYCLE_HOOKS',
          'computed',
          'watch',
          'components',
          'head',
          ['template', 'render'],
          'renderError'
        ]
      }
    ]
  }
}
