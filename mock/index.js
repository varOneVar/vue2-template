/*
 * @Author: Song Qing
 * @Date: 2021-04-23 10:35:12
 * @LastEditTime: 2021-04-26 17:14:15
 * @LastEditor: Song Qing
 * @Description: 模拟请求
 * @FilePath: \app-test\mock\index.js
 */
const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const Mock = require('mockjs')
const mocks = require('./mock.js')

const mockDir = path.join(process.cwd(), 'mock')

// for mock server
function responseFake(url, type, respond) {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || 'get',
    response(req, res) {
      console.log(`request invoke:${req.path}`)
      res.json(Mock.mock(typeof respond === 'function' ? respond(req, res) : respond))
    }
  }
}

function registerRoutes(app) {
  let mockLastIndex
  const mocksForServer = mocks.map((route) => {
    return responseFake(route.url, route.type, route.response)
  })
  mocksForServer.forEach((mock) => {
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  })

  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach((i) => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

module.exports = (app) => {
  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  let { mockRoutesLength, mockStartIndex } = registerRoutes(app)

  // watch files, hot reload mock server
  chokidar
    .watch(mockDir, {
      ignored: /index/,
      ignoreInitial: true
    })
    .on('all', (event, mockPath) => {
      if (event === 'change' || event === 'add') {
        try {
          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength)

          // clear routes cache
          unregisterRoutes()

          const mockRoutes = registerRoutes(app)
          mockRoutesLength = mockRoutes.mockRoutesLength
          mockStartIndex = mockRoutes.mockStartIndex

          console.log(
            chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${mockPath}`)
          )
        } catch (error) {
          console.log(chalk.redBright(error))
        }
      }
    })
}
