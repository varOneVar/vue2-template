<template>
  <div v-if="!item.hidden">
    <template v-if="!item.children">
      <app-link v-if="item.meta" :to="item.path">
        <el-menu-item :index="item.path">
          <item :title="item.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="item.path" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :title="item.meta.title" />
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :item="child" />
    </el-submenu>
  </div>
</template>

<script>
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
  components: { Item, AppLink }
}
</script>
