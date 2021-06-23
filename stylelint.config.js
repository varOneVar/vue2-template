// 英文官网 https://stylelint.io/user-guide/rules/list/property-no-unknown/
// 中文解释 https://ask.dcloud.net.cn/article/36067
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    'block-no-empty': null,
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
    // 例如，定义缩进规则
    indentation: [
      // 2个空格
      2,
      {
        // 接收xxx
        except: ['block'],
        // 错误的提示信息
        message: 'Please use 2 spaces for indentation.',
        // 规则级别，是警告，也可以是错误error
        severity: 'warning'
      }
    ],
    'at-rule-no-unknown': null
  }
}
