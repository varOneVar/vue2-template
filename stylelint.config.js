module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    'block-no-empty': null,
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
