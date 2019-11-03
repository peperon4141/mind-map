<template lang="pug">
#editor(:style="styles")
  vsidebar
  drawer
  vfooter
</template>

<script>
export default {
  computed: {
    styles () {
      return {
        '--width': '240px',
        '--lightColor': 'rgb(200,216,216)',
        '--lighterColor': 'rgb(248,255,255)',
        '--lightestColor': 'rgb(255,255,255)',
        '--middleColor': 'rgb(92,108,108)',
        '--darkColor': 'rgb(48, 64, 64)',
        '--darkerColor': 'rgb(16, 32, 32)',
        '--darkestColor': 'rgb(0, 16, 16)',
        // '--lightColor': 'rgb(216,200,216)',
        // '--lighterColor': 'rgb(255,248,255)',
        // '--lightestColor': 'rgb(255,255,255)',
        // '--middleColor': 'rgb(108,92,108)',
        // '--darkColor': 'rgb(64, 48, 64)',
        // '--darkerColor': 'rgb(32, 16, 32)',
        // '--darkestColor': 'rgb(16,0,16)'
      }
    }
  },
  components: {
    vnavbar: () => import('@/components/Organisms/VNavBar.vue'),
    vsidebar: () => import('@/components/Organisms/VSideBar.vue'),
    vfooter: () => import('@/components/Organisms/VFooter.vue'),

    drawer: () => import('@/components/Panes/Drawer.vue'),
  }
}
</script>

<style lang="sass" scoped >
#editor
  background-color: var(--lighterColor)
  display: flex
  /deep/ #vsidebar
    min-width: 200px
  /deep/ #drawer
    flex-grow: 1
</style>
