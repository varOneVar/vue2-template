import axios from 'axios'
import qs from 'query-string'
// import { getMessage } from '@/api/error'
import { getUrlQuery } from '@/utils'
// import storage from 'good-storage'

import retryAdapterEnhancer from './api-again'
import cacheAdapterEnhancer from './api-cache'
import cancelRepeatRequestBase from './api-cancel'
import { createAdapterMiddleareModel } from './handlers'

const APP = createAdapterMiddleareModel()
APP.use(
  // 断线重连, 延时时间每次翻倍
  retryAdapterEnhancer({
    times: 3,
    delay: 1000
  })
)
APP.use(
  // 数据缓存
  cacheAdapterEnhancer({
    maxAge: 2 * 60 * 1000 // 缓冲有效期（ms）
  })
)
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
  const cancelRequest = cancelRepeatRequestBase()
  const adapter = APP.listen(axios.defaults.adapter)
  const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 60000 * 3,
    adapter // 适配器触发在顺序： 请求拦截器 -- 适配器 -- 响应拦截器
  })
  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      const params = getParams(config)
      if (params.noCancel) {
        delete params.noCancel
      } else {
        cancelRequest.remove(config)
        cancelRequest.add(config)
      }
      // checkTimeout()
      // const params = getParams(config)
      console.log('请求拦截器')
      return config
    },
    (error) => {
      console.log('请求异常', error)
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
      const { headers, data, config } = response
      // 取消重复请求
      cancelRequest.remove(config)
      // 处理blob数据
      if (config.responseType === 'blob' || (headers && headers['content-disposition'])) {
        if (config.filetype === 'pdf') {
          return data
        }
        return response
      }
      // 返回结果有三种，做下适配
      if (typeof data !== 'object') {
        return response
      }
      return data
    },
    (error) => {
      console.log('响应错误', error)
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
