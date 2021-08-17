<template>
  <div id="app"></div>
</template>

<script>
import { apiArticleList } from '@/api/jobs/pages'
import { apiUseLogin } from '@/api/jobs/user'

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
