import axios from 'axios'
import qs from 'query-string'
// import { getMessage } from '@/api/error'
import { getUrlQuery } from '@/utils'
// import storage from 'good-storage'

import cancelRepeatRequest from './api-cancel'

// 获取参数
function getParams(config) {
  const obj = {
    post: 'data',
    get: 'params'
  }
  const key = obj[config.method]
  if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    let result = {}
    const data = config[key]
    try {
      if (data) {
        result = getUrlQuery(`?${data}`)
      }
      return result
    } catch (error) {
      return data
    }
  }
  return config[key]
}

// 创建请求实例
function createService() {
  // 取消重复请求
  const cancelRequest = cancelRepeatRequest()

  const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 60000
  })
  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      // checkTimeout()
      const params = getParams(config)
      // 取消重复请求
      if (params.noCancel) {
        delete params.noCancel
      } else {
        cancelRequest.remove(config, params)
        cancelRequest.add(config, params)
      }
      return config
    },
    (error) => {
      // TODO: 错误弹窗
      // Message({
      //   message: `请求异常 ${error.message}`,
      //   type: 'error',
      //   duration: 3 * 1000
      // })
      return Promise.reject(error)
    }
  )
  // 响应拦截器
  service.interceptors.response.use(
    async (response) => {
      const {
        headers,
        config,
        data,
        data: { code, error }
      } = response
      // 取消重复请求
      cancelRequest.remove(config)
      // 处理blob数据
      if (config.responseType === 'blob' || headers['content-disposition']) {
        if (config.filetype === 'pdf') {
          return data
        }
        return response
      }
      // 返回结果有三种，做下适配
      if (typeof data !== 'object') {
        return response
      }
      // 有些接口返回的是error
      if (code === undefined) {
        // 有些接口返回的是字符串，没有状态
        if (error === undefined) return response
        // 0代表修改， 100代表新增
        if (error === 0 || error === 100) {
          data.code = '0'
          data.result = data.data
        } else {
          // TODO: 错误弹窗
          // Message({
          //   message: data.msg || data.data,
          //   type: 'error',
          //   duration: 3 * 1000
          // })
        }
        return data
      }
      if (!(code === '0' || code === 0)) {
        // TODO: 错误弹窗
        // Message({
        //   message: getMessage(code, message || result),
        //   type: 'error',
        //   duration: 3 * 1000
        // })
      }
      return data
    },
    (error) => {
      let code = ''
      if (error.response) {
        code = error.response.status
      } else if ('message' in error && !error.message) {
        console.log('取消重复请求', error)
        code = null
      } else {
        code = '网络已断开'
      }
      if (code !== null) {
        // TODO: 错误弹窗
        // Message({
        //   message: `网络开小差(${code})`,
        //   type: 'error',
        //   duration: 3 * 1000
        // })
      }
      return Promise.reject(error)
    }
  )

  return service
}

const service = createService()
export const __get = (url, args = {}, config = {}) => service.get(url, { params: args, ...config })
export const __getExport = (url, args = {}, config = {}) =>
  service.get(url, { params: args, responseType: 'blob', ...config })
export const __post = (url, args = {}, config = {}) => service.post(url, args, config)
export const __postEncode = (url, args = {}, config = {}) =>
  service.post(url, qs.stringify(args), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...config
  })
export const __postUpload = (url, data = new FormData(), config = {}) =>
  service.post(url, data, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'multipart/form-data'
    },
    ...config
  })
export const __postout = (url, args = {}, config = {}) =>
  service.request({ url, method: 'postout', data: args, ...config })

export default service
