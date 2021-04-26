<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="form-class a1sd--213--asdas-123"></div>
    <button class="btn" @click="testHandler">get请求函数</button>
    <button class="btn" @click="testHandler1">post请求函数</button>
  </div>
</template>

<script>
import { apiArticleList } from '@/api/jobs/pages'
import { apiUseLogin } from '@/api/jobs/user'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  methods: {
    async testHandler1() {
      const res = await apiUseLogin({
        userName: 'admin',
        password: '123456'
      })
      console.log('结果', res)
    },
    async testHandler() {
      const res = await apiArticleList({
        page: 1,
        limit: 10
      })
      console.log('结果', res)
    }
  },
  created() {
    this.testHandler()
    this.testHandler1()
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 80px;
  padding: 20px;
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.form-class {
  color: red;
}

.a1sd--213--asdas-123 {
  color: blue;
}
</style>
