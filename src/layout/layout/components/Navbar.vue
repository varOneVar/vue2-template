<template>
  <div class="navbar clearfix">

    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu fr flex-align-center">
      <!-- <img class="lock" :src="require('@/assets/lock.png')" @click="$router.push('/changeuserpwd')"> -->
      <el-avatar
        class="avatar"
        :size="30"
        :src="userInfo&&userInfo.avatar"
      >
        <img :src="require('@/assets/avatar.png')">
      </el-avatar>
      <span>{{ userName || '未登录' }}</span>
      <i class="el-icon-switch-button logout hover-effect" title="退出" @click="logout" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {

  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$confirm('确认要退出当前账号吗？')
        .then(() => {
          this.loginOutByToken()
        })
        .catch(_ => {})
    },
    ...mapActions('user', ['loginOutByToken'])
  },
    computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'userInfo',
      'userName'
    ])
  },
  components: {
    Breadcrumb,
    Hamburger
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.navbar {
  height: $navBarHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .lock {
    margin-left: 10px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .avatar {
    margin-left: 10px;
    margin-right: 10px;
    background-color: #282828;
  }
  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    height: 100%;
    &:focus {
      outline: none;
    }
    .logout {
      font-size: 18px;
      margin: 0 16px;
      position: relative;
      cursor: pointer;
      &::after {
        content: '';
        position: absolute;
        left: -4px;
        right: -10px;
        top: -10px;
        bottom: -10px;
      }
    }
    .hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025);
        }
      }
  }
}
</style>
