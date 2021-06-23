import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
import storage from 'good-storage'
import packageJson from '../../package.json'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => storage.session.get(key),
        setItem: (key, value) =>
          storage.session.set(key, value),
        removeItem: key => storage.session.remove(key)
      },
      key: `${packageJson.name}-key`
    })
  ]
})

export default store
