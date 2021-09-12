<template>
  <div>
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menubg"
        :text-color="variables.menutext"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in menuList"
          :key="route.path"
          :is-collapse="isCollapse"
          :item="route"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/element-variables.scss'
import settings from '@/settings'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import { isExternal } from '@/utils/validate'

export default {
  methods: {
    resolvePath(basePath, routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(basePath)) {
        return basePath
      }
      return `${basePath}/${routePath}`.replace(/\/\//g, '/')
    }
  },
  computed: {
    ...mapGetters(['accessedRoutes', 'sidebar']),
    activeMenu({ $route: { meta: { activeMenu } = {}, path } }) {
      // if set path, the sidebar will highlight the path you set
      if (activeMenu) {
        return activeMenu
      }
      return path
    },
    menuList({ accessedRoutes }) {
      const fn = (arr, basePath) => {
        const res = arr.reduce((t, c) => {
          if (!c.path.startsWith('/')) {
            c.path = this.resolvePath(basePath, c.path)
          }
          if (c.children) {
            const Arr = c.children.filter((it) => !it.hidden)
            if (Arr.length) {
              if (Arr.length === 1) {
                const item = Arr[0]
                if (!item.path.startsWith('/')) {
                  item.path = this.resolvePath(c.path, item.path)
                }
                if (item.children) {
                  item.children = fn(item.children, item.path)
                }
                t.push(item)
              } else {
                c.children = fn(Arr, c.path)
                t.push(c)
              }
            } else if (!c.hidden && c.path && !c.redirect) {
              delete c.children
              t.push(c)
            }
          } else if (!c.hidden && c.path && !c.redirect) {
            t.push(c)
          }
          return t
        }, [])
        return res
      }
      return fn(JSON.parse(JSON.stringify(accessedRoutes)), '')
    },
    showLogo() {
      return settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse({ sidebar: { opened } }) {
      return !opened
    }
  },

  components: { SidebarItem, Logo }
}
</script>
