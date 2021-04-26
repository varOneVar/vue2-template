import Vue from 'vue'
import App from './App.vue'
// import '@/api/mock'

Vue.config.productionTip = false

// 如果错误被页面的try/catch捕获，且catch没有抛出错误，全局异常捕获就拿不到错误，作用不大
Vue.config.errorHandler = function vueGloablerrorHandler(err, vm, info) {
  console.log('全局异常捕获', err, vm, info)
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
}

new Vue({
  render: (h) => h(App)
}).$mount('#app')
