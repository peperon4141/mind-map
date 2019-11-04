<template lang="pug">
#editor(:style="styles")
  sidebar
  drawer
  vfooter
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    styles () {
      return {
        '--width': '300px',
        '--lightColor': 'rgb(200,216,216)',
        '--lighterColor': 'rgb(248,255,255)',
        '--lightestColor': 'rgb(255,255,255)',
        '--middleColor': 'rgb(92,108,108)',
        '--darkColor': 'rgb(48, 64, 64)',
        '--darkerColor': 'rgb(16, 32, 32)',
        '--darkestColor': 'rgb(0, 16, 16)',
      }
    }
  },
  methods: {
  },
  components: {
    vnavbar: () => import('@/components/Organisms/VNavBar.vue'),
    sidebar: () => import('@/components/Organisms/SideBar.vue'),
    vfooter: () => import('@/components/Organisms/VFooter.vue'),

    drawer: () => import('@/components/Panes/Drawer.vue'),
  }
}
</script>

<style lang="sass" scoped >
#editor
  height: 100%
  background-color: var(--lighterColor)
  display: flex
  /deep/ #drawer
    flex-grow: 1
</style>
