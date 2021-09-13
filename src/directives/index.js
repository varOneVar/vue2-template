/*
 * @Author: Song Qing
 * @Date: 2021-06-21 16:15:43
 * @LastEditTime: 2021-09-13 22:26:05
 * @LastEditor: Song Qing
 * @Description: 全局指令注册
 * @FilePath: \vue2-template\src\directives\index.js
 */

// 监听的mousedown和mouseup事件，所以鼠标右键也会触发，需要改就自行复制代码改动
import permission from './permission'

export default (Vue) => {
  Vue.directive('permission', permission)
}
