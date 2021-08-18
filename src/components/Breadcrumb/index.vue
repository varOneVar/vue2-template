<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <template v-for="(item, index) in levelList">
        <el-breadcrumb-item
          v-if="item.meta.title && item.meta.breadcrumb !== false"
          :key="item.path"
        >
          <span
            v-if="item.redirect === 'noredirect' || index == levelList.length - 1"
            class="no-redirect"
          >
            {{ titleChange(item.meta.title) }}
          </span>
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { pathToRegexp } from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  methods: {
    titleChange(title) {
      const match = this.$route.matched[1]
      let type = ''
      match && match.meta && (type = match.meta.title)
      if (title === '创建与编辑') {
        const result = this.$route.query.id ? `编辑${type}` : `创建${type}`
        document.title = result
        return result
      }
      return title
    },
    getBreadcrumb() {
      // only show routes with meta.title
      const matched = this.$route.matched.filter((item) => item.meta && item.meta.title)
      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      const toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  },
  created() {
    this.getBreadcrumb()
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  margin-left: 8px;
  font-size: 14px;
  line-height: 50px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
