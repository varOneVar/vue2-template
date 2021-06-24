// 英文官网 https://stylelint.io/user-guide/rules/list/property-no-unknown/
// 中文解释 https://ask.dcloud.net.cn/article/36067
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export']
      }
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['/^ex-/']
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ]
  }
}
