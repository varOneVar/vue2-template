/*
 * @Author: Song Qing
 * @Date: 2021-04-23 17:09:02
 * @LastEditTime: 2021-04-26 15:38:08
 * @LastEditor: Song Qing
 * @Description: 重连请求
 * @FilePath: \app-test\src\api\base\api-again.js
 */
function retryAdapterEnhancer(options = {}) {
  const { times = 0, delay = 300 } = options

  return async (config, next) => {
    const { retryTimes = times, retryDelay = delay } = config
    let __retryCount = 0
    const request = async () => {
      try {
        return await next(config)
      } catch (err) {
        // 判断是否进行重试
        if (!retryTimes || __retryCount >= retryTimes) {
          return Promise.reject(err)
        }
        if (err.message.includes('aborted')) {
          // 重复请求
          return Promise.reject(err)
        }
        __retryCount += 1 // 增加重试次数
        // 延时处理
        const again = new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, 2 ** (__retryCount - 1) * retryDelay)
        })
        // 重新发起请求
        return again.then(() => {
          return request()
        })
      }
    }
    return request()
  }
}

export default retryAdapterEnhancer
