import axios from 'axios'
import qs from 'query-string'

import store from '@/store'
import { getClientInfo, checkTimeout, failDispose } from '@/utils'
import { SUCCESS_CODE } from '@/constants'

import { getMessage, tokenInvalidate, tokenLoginother } from './api-error'
import retryAdapterEnhancer from './api-again' // config中带有noRetry则不使用断线重连
import cacheAdapterEnhancer from './api-cache' // config中带有noCache则不使用数据缓存
import cancelRepeatRequestBase from './api-cancel' // config中带有noCancel则不使用取消重复请求
import { createAdapterMiddleareModel } from './handlers'

const APP = createAdapterMiddleareModel()

// 断线重连, 延时时间每次翻倍
APP.use(
  retryAdapterEnhancer({
    times: 2, // 断线重连次数，最多四次，多了没必要
    delay: 1000 // 延时触发重连，2的指数性增加，1s, 2s, 4s,8s...
  })
)

// 数据缓存
APP.use(
  cacheAdapterEnhancer({
    maxAge: 2 * 60 * 1000 // 缓冲有效期（ms）
  })
)

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
      checkTimeout() // 检查登录超时
      const { token } = store.getters
      // header里添加权限
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = JSON.stringify({ token })
        config.headers.clientInfo = getClientInfo()
      }
      // 如果参数带有noCancel则取消重复请求
      if (config.noCancel) {
        delete config.noCancel
      } else {
        delete config.noCancel
        cancelRequest.remove(config)
        cancelRequest.add(config)
      }
      // 加载全局loading
      if (config.noLoading) {
        store.commit('app/SET_CONTENT_LOADING', false)
        store.commit('app/SET_WHOLE_PAGE_LOADING', false)
        delete config.noLoading
      } else if (config.wholePageLoading) {
        store.commit('app/SET_WHOLE_PAGE_LOADING', true)
        delete config.wholePageLoading
      } else {
        store.commit('app/SET_CONTENT_LOADING', true)
      }
      console.log('请求拦截器')
      return config
    },
    (error) => {
      console.log('请求异常', error)
      // TODO: 错误弹窗
      return Promise.reject(error)
    }
  )
  // 响应拦截器
  service.interceptors.response.use(
    async (response) => {
      const {
        headers,
        data,
        config,
        data: { code, message }
      } = response
      // 取消重复请求
      cancelRequest.remove(config)
      // 处理blob数据
      if (config.responseType === 'blob' || (headers && headers['content-disposition'])) {
        if (config.filetype === 'pdf') {
          return data
        }
        return response
      }
      // token失效或者在别处登录
      if (code === tokenInvalidate || code === tokenLoginother) {
        failDispose({
          content: getMessage(code)
        })
        return data
      }
      // 异常code处理
      if (code !== SUCCESS_CODE) {
      // 提示
        return data
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
      }
      return Promise.reject(error)
    }
  )

  return service
}

// 创建请求方法
function initServiceType(service) {
  return {
    // 常规get请求
    __get(url, args = {}, config = {}) {
      return service.get(url, { params: args, ...config })
    },
    // 常规post， json格式数据
    __post(url, args = {}, config = {}) {
      return service.post(url, args, config)
    },
    // 下载get请求
    __getExport(url, args = {}, config = {}) {
      return service.get(url, { params: args, responseType: 'blob', ...config })
    },
    // form表单请求
    __postEncode(url, args = {}, config = {}) {
      return service.post(url, qs.stringify(args), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        ...config
      })
    },
    // 上传文件
    __postUpload(url, data = new FormData(), config = {}) {
      return service.post(url, data, {
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'multipart/form-data'
        },
        ...config
      })
    }
  }
}

const serviceInstance = createService()
export default initServiceType(serviceInstance)
