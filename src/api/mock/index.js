/*
 * @Author: Song Qing
 * @Date: 2021-04-23 10:35:12
 * @LastEditTime: 2021-04-23 11:01:27
 * @LastEditor: Song Qing
 * @Description: 模拟请求
 * @FilePath: \app-test\src\mock\index.js
 */
import axiosInstance from '@/api/base/api-interceptor'
import MockAdapter from 'axios-mock-adapter'

import userJson from './fakeData/user.json'

const mock = new MockAdapter(axiosInstance, { delayResponse: 1500 })

mock.onPost('/user/login').reply(function userLogin(config) {
  console.log(config, 'config是axios的配置，包含url')
  if (!config.data) {
    //  [status, data, headers]
    return [
      400,
      {
        code: '-1',
        result: null,
        message: 'invalided params: userName or password is error'
      }
    ]
  }
  if (config.data.userName === userJson.userName && config.data.password === userJson.password) {
    return [
      200,
      {
        code: '0',
        result: userJson,
        message: 'success'
      }
    ]
  }
  return [
    200,
    {
      code: '-1',
      result: null,
      message: 'invalided params: userName or password is error'
    }
  ]
})
