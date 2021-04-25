/*
 * @Author: Song Qing
 * @Date: 2021-04-22 15:50:04
 * @LastEditTime: 2021-04-25 17:04:48
 * @LastEditor: Song Qing
 * @Description: 错误代码
 * @FilePath: \app-test\src\api\api-error.js
 */
export const errors = [
  { code: '-1', message: '服务器系统异常' },
  { code: '-208', message: '无法找到该用户' },
  { code: '-200', message: '账号或者密码错误' },
  { code: '-617', message: 'Token已失效或不存在' },
  { code: '805', message: '账号已在其他地方登陆，请重新登录' }
]
export const getMessage = (code, msg) => {
  const one = errors.find((v) => v.code === code)
  return one.message || msg
}
