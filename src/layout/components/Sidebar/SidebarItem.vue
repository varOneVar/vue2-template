<template>
  <div v-if="!item.hidden">
    <template v-if="!item.children">
      <app-link v-if="item.meta" :to="item.path">
        <el-menu-item :index="item.path">
          <i v-if="isCollapse" class="el-icon-menu" />
          <item :title="item.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="item.path" popper-append-to-body>
      <template slot="title">
        <i v-if="isCollapse" class="el-icon-menu" />
        <item v-if="item.meta" :title="item.meta.title" />
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :item="child" />
    </el-submenu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    isCollapse({ sidebar: { opened } }) {
      return !opened
    }
  },
  components: { Item, AppLink }
}
</script>
