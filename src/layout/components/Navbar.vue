<template>
  <div class="navbar flex-sb-c">
    <div class="flex-align-center">
      <hamburger
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />

      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <div class="right-menu flex-align-center">
      <el-avatar class="avatar" :size="30" :src="avatar">
        <img :src="require('@/assets/avatar.png')" />
      </el-avatar>
      <span>{{ userName || '未登录' }}</span>
      <i class="el-icon-switch-button logout" title="退出" @click="logout" />
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
        .catch(() => {})
    },
    ...mapActions('user', ['loginOutByToken'])
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'userName'])
  },
  components: {
    Breadcrumb,
    Hamburger
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  height: $navBarHeight;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    height: 100%;
    line-height: 46px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .avatar {
    margin-right: 10px;
    margin-left: 10px;
    background-color: #282828;
  }

  .right-menu {
    height: 100%;
    &:focus {
      outline: none;
    }
    .logout {
      position: relative;
      margin: 0 16px;
      font-size: 18px;
      cursor: pointer;
      &::after {
        position: absolute;
        top: -10px;
        right: -10px;
        bottom: -10px;
        left: -4px;
        content: '';
      }
    }
  }
}
</style>
