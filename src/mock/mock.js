/*
 * @Author: Song Qing
 * @Date: 2021-04-26 16:15:13
 * @LastEditTime: 2021-04-26 17:13:53
 * @LastEditor: Song Qing
 * @Description: fix mockjs bug
 * @github: https://github.com/nuysoft/Mock/wiki/Getting-Started
 */

const user = require('./fakeData/user')
const article = require('./fakeData/article')

module.exports = [...user, ...article]
