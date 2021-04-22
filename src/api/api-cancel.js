/* eslint-disable no-param-reassign */
/*
 * @Author: Song Qing
 * @Date: 2021-04-22 15:57:28
 * @LastEditTime: 2021-04-22 18:00:28
 * @LastEditor: Song Qing
 * @Description:
 * @FilePath: \app-test\src\api\api-cancel.js
 */
import axios from 'axios'

const cancelRepeatRequestBase = {
  add(config, params) {
    const { url, method } = config
    this.requestParams = params
    config.cancelToken = new axios.CancelToken((cancel) => {
      const cancelInfo = {
        flag: `url=${url}&request_method=${method}&request_params=${JSON.stringify(params)}`,
        cancel
      }
      if (this.requestPool) {
        this.requestPool.push(cancelInfo)
      } else {
        this.requestPool = []
      }
    })
  },
  remove(config, params = this.requestParams) {
    const { url, method } = config
    const flag = `url=${url}&request_method=${method}&request_params=${JSON.stringify(params)}`
    let i = 0
    if (!this.requestPool) return
    while (i < this.requestPool.length) {
      if (this.requestPool[i].flag === flag) {
        this.requestPool[i].cancel()
        this.requestPool.splice(i, 1)
      } else {
        i += 1
      }
    }
    this.requestParams = {}
  }
}

export default function cancelRepeatRequest() {
  return Object.create(cancelRepeatRequestBase)
}
