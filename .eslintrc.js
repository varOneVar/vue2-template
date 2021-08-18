const path = require('path')

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['vue', 'html', '@babel'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    babelOptions: {
      configFile: path.resolve(__dirname, './babel.config.js')
    }
  },
  rules: {
    'vue/script-setup-uses-vars': 'off',
    'prettier/prettier': 'error',
    'no-param-reassign': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/no-multiple-template-root': 'off',
    'no-unused-expressions': 0,
    'no-underscore-dangle': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
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
