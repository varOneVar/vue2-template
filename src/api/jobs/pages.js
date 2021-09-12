/*
 * @Author: Song Qing
 * @Date: 2021-04-25 18:04:39
 * @LastEditTime: 2021-09-12 20:59:13
 * @LastEditor: Song Qing
 * @Description: 页面相关接口
 * @FilePath: \vue2-template\src\api\jobs\pages.js
 */
import service from '@/api/base/api-interceptor'

const { __get } = service
const prefix = '/mock-server/article'
export const apiArticleList = (args) => __get(`${prefix}/list`, args)
export const apiArticleDetail = (args) => __get(`${prefix}/detail`, args)
