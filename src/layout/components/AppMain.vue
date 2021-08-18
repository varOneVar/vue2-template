<template>
  <section class="app-main" :class="{ iframeAppMain: hiddenOther }">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <div class="wrapper">
          <div class="wrapper__div">
            <router-view :key="key" v-loading="contentLoading" />
          </div>
        </div>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'AppMain',
  computed: {
    ...mapState('app', ['contentLoading']),
    ...mapGetters(['hiddenOther']),
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;
  height: calc(100vh - #{$navBarHeight});
  overflow-x: auto;

  @include scrollBar;
}

.wrapper {
  overflow: hidden;

  &__div {
    padding: 16px;
    margin: 16px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}
</style>
