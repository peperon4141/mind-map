<template lang="pug">
#editor(:style="styles")
  headerbar
  main
    sidebar
    drawer
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    styles () {
      let styles = {}
      styles['--width'] = '300px'
      styles['--brand'] = 'rgb(255, 200, 1)'
      styles['--shadow'] = 'rgb(80, 96, 96)'
      styles['--sideBarWidth'] = '240px'
      
      switch(this.$store.state.project.mode) {
        case 1:
          // dark
          styles['--background'] = 'rgb(40, 56, 56)'
          styles['--main'] = 'rgb(16, 24, 24)'
          styles['--sub'] = 'rgb(32, 48, 48)'
          styles['--accent'] = 'rgb(192, 216, 216)'
          styles['--trans'] = 'rgba(80, 96, 96, 0.8)'
          styles['--trans-2'] = 'rgba(80, 96, 96, 0.8)'
          break
        case 2:
          // bluePrint
          styles['--background'] = 'rgb(27, 59, 89)'
          styles['--main'] = 'rgb(45, 92, 123)'
          styles['--sub'] = 'rgb(37, 80, 110)'
          styles['--accent'] = 'rgb(192, 216, 216)'
          styles['--trans'] = 'rgb(192, 216, 216, 0.4)'
          styles['--trans-2'] = 'rgba(80, 96, 96, 0.8)'
          break
        case 3:
          // fool
          styles['--background'] = 'rgb(255, 200, 1)'
          styles['--main'] = 'rgb(255, 200, 1)'
          styles['--sub'] = 'rgb(255, 200, 1)'
          styles['--accent'] = 'rgb(0, 123, 255)'
          styles['--trans'] = 'rgb(200, 200, 200, 0.5)'
          styles['--trans-2'] = 'rgba(80, 96, 96, 0.8)'
          break
        default:
          // light
          styles['--background'] = 'rgb(200, 216, 216)'
          styles['--main'] = 'rgb(255, 255, 255)'
          styles['--sub'] = 'rgb(252,254,254)'
          styles['--accent'] = 'rgb(21, 51, 65)'
          styles['--trans'] = 'rgba(216, 232, 232, 0.5)'
          styles['--trans-2'] = 'rgba(216, 232, 232, 0.3)'
      }
      return styles
    }
  },
  components: {
    headerbar: () => import('@/components/Organisms/HeaderBar.vue'),
    sidebar: () => import('@/components/Organisms/SideBar.vue'),
    footerbar: () => import('@/components/Organisms/FooterBar.vue'),

    drawer: () => import('@/components/Panes/Drawer.vue'),
  }
}
</script>

<style lang="sass" scoped >
$header-height: 40px
$footer-height: 24px

#editor
  height: 100%
  display: flex
  flex-direction: column
  background-color: var(--brand)
  /deep/ #headerbar
    height: $header-height
  main
    flex-grow: 1
    background-color: var(--background)
    // background: linear-gradient(var(--main), var(--background))
    display: flex
    height: 100%
    /deep/ #drawer
      flex-grow: 1
  /deep/ #footerbar
    height: $footer-height
</style>
