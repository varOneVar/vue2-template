<template>
  <div :class="classObj" class="app-wrapper flex">
    <aside v-if="!hiddenOther" class="aside" :style="{ width: `${siderBarWidth}px` }">
      <sidebar class="sidebar-container" />
    </aside>
    <div :class="{ iframe: hiddenOther }" class="main-container flex1">
      <header v-if="!hiddenOther" class="header">
        <navbar />
      </header>
      <app-main />
    </div>
    <el-backtop target=".app-main" :right="30" :bottom="30" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { AppMain, Navbar, Sidebar } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  mixins: [ResizeMixin],
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar
    }),
    ...mapGetters(['hiddenOther', 'isMinScreen']),
    siderBarWidth() {
      return this.sidebar.opened ? 210 : 60
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.isMinScreen
      }
    }
  },
  components: {
    AppMain,
    Navbar,
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  height: 100%;
  overflow: hidden;
}

.aside {
  width: 200px;
  min-height: 100%;
  overflow-y: auto;
  background: $menuBg;
  transition: width 0.28s;
  @include scrollBar;
}

.main-container {
  position: relative;
  height: 100%;
  padding-top: $navBarHeight;
  &.iframe {
    padding-top: 0;
  }
}

.header {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9;
  transition: width 0.28s;
}
</style>
