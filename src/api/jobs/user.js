/*
 * @Author: Song Qing
 * @Date: 2021-04-25 18:04:22
 * @LastEditTime: 2021-04-26 17:09:55
 * @LastEditor: Song Qing
 * @Description: 用户相关接口
 * @FilePath: \app-test\src\api\jobs\user.js
 */
import { __post } from '@/api/base/api-interceptor'

const prefix = '/mock-server/user'
export const apiUseLogin = (args) =>
  __post(`${prefix}/login`, args, {
    cache: false
  })
export const apiUseLogout = (args) =>
  __post(`${prefix}/logout`, args, {
    cache: false
  })
