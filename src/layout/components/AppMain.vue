<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view v-loading="contentLoading" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppMain',
  computed: {
    ...mapGetters(['hiddenOther']),
    contentLoading() {
      return this.$store.state.app.contentLoading
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;

  /* 50= navbar  50  */
  min-height: calc(100vh - #{$navBarHeight});

  &.iframeAppMain {
    min-height: 100%;
  }
}

.fixed-header + .app-main {
  overflow: hidden;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - #{$navBarHeight} - #{$tagsViewHeight});
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
