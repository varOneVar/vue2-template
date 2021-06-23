<template>
  <el-scrollbar class="page-component__scroll" :class="{iframeScroll:hiddenOther}">
    <div :class="classObj" class="app-wrapper">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar v-if="!hiddenOther" class="sidebar-container" />
      <div :class="{hasTagsView:needTagsView, iframe: hiddenOther}" class="main-container">
        <div v-if="!hiddenOther" :class="{'fixed-header':fixedHeader}">
          <navbar />
          <tags-view v-if="needTagsView" />
        </div>
        <app-main />
      </div>
      <el-backtop
        target=".page-component__scroll .el-scrollbar__wrap"
        :right="30"
        :bottom="30"
      />
    </div>
  </el-scrollbar>
</template>

<script>
import { AppMain, Navbar, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState, mapGetters } from 'vuex'

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
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    ...mapGetters(['hiddenOther']),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    // height: 100%;
    // width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
      bottom: 0;
      @include utils-pierce {
        .app-main {
          padding-top: $navBarHeight;
        }
      }
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 799;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - #{$navBarHeight})
  }

  .mobile .fixed-header {
    width: 100%;
  }
  .page-component__scroll {
    height: calc(100% - #{$navBarHeight});
    margin-top: $navBarHeight;
    &.iframeScroll {
      height: 100%;
      margin-top: 0;
    }
    @include utils-pierce {
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
  }
  .iframe {
    margin-left: 0px !important;
  }
</style>
