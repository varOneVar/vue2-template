/*
 * @Author: Song Qing
 * @Date: 2021-06-23 19:08:09
 * @LastEditTime: 2021-08-17 23:36:32
 * @LastEditor: Song Qing
 * @Description: 给vue原型上增加方法
 * @FilePath: \vue2-template\vue2-template\src\global.js
 */

import dayjs from 'dayjs'
import log from '@/utils/log'
import storage from '@/utils/storage'
import { deepClone } from '@/utils'
import * as constants from './constants'

export default (Vue) => {
  Object.defineProperties(Vue.prototype, {
    // 输出,使用这个代替console.log，只在非生产环境输出，生产环境不会输出任何东西
    $log: {
      value: log,
      writable: false,
      enumerable: false,
      configurable: false
    },
    // 日期规范
    $dayjs: {
      value: dayjs,
      writable: false,
      enumerable: false,
      configurable: false
    },
    // storage
    $storage: {
      value: storage,
      writable: false,
      enumerable: false,
      configurable: false
    },
    // 深拷贝
    $deepClone: {
      value: deepClone,
      writable: false,
      enumerable: false,
      configurable: false
    },
    // 定义常量
    $constants: {
      value: constants,
      writable: false,
      enumerable: false,
      configurable: false
    },
    // 请求正常code
    $code: {
      value: constants.SUCCESS_CODE,
      writable: false,
      enumerable: false,
      configurable: false
    }
  })
}
