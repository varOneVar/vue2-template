/*
 * @Author: Song Qing
 * @Date: 2021-04-26 16:20:10
 * @LastEditTime: 2021-04-26 17:13:46
 * @LastEditor: Song Qing
 * @Description: 模拟用户信息相关接口
 * @FilePath: \app-test\mock\fakeData\user.js
 */
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}
const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const prefix = '/mock-server/user'

module.exports = [
  // user login
  {
    url: `${prefix}/login`,
    type: 'post',
    response: (config) => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: '0',
        data: token
      }
    }
  },

  // get user info
  {
    url: `${prefix}/info.*`,
    type: 'get',
    response: (config) => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: '0',
        data: info
      }
    }
  },

  // user logout
  {
    url: `${prefix}/logout`,
    type: 'post',
    response: () => {
      return {
        code: '0',
        data: 'success'
      }
    }
  }
]
