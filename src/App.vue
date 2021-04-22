<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="form-class a1sd--213--asdas-123"></div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  methods: {
    testHandler() {
      console.log(1)
    }
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
