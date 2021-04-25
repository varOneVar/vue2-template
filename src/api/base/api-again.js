/*
 * @Author: Song Qing
 * @Date: 2021-04-23 17:09:02
 * @LastEditTime: 2021-04-25 16:58:47
 * @LastEditor: Song Qing
 * @Description: 重连请求
 * @FilePath: \app-test\src\api\api-again.js
 */
function retryAdapterEnhancer(options) {
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
        __retryCount += 1 // 增加重试次数
        // 延时处理
        const again = new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, retryDelay)
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
