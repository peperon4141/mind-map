<template lang="pug">
header#headerbar
  #left
    font-awesome-icon.icon.reactive#brand(icon="brain")
  #right
    font-awesome-icon.icon.reactive.adjust(
      icon="adjust"
      :style="style"
      @mousedown="changeMode(mode + 1)"
    )
    font-awesome-icon.icon.reactive(icon="bell")
    font-awesome-icon.icon.reactive(icon="cog")
</template>

<script>
import store from '@/store'
const modeCount = 4
export default {
  computed: {
    mode () {
      return this.$store.state.project.mode
    },
    style() {
      return {
        transform: `rotate(${this.mode * (360 / modeCount)}deg)`,
        transition: 'all 0.1s linear'
      }
    }
  },
  methods: {
    changeMode (mode) {
      mode = mode % modeCount
      this.$store.commit('changeUserSetting', { mode: mode })
    }
  }
}
</script>

<style lang="sass" scoped>
#headerbar
  display: flex
  width: 100%
  background-color: var(--brand)
  align-items: center
  padding: 0 8px
  box-shadow: 0 0 4px 0 var(--shadow)
  z-index: 20
  #left
    justify-content: flex-start
    #brand
  #right
    margin-left: auto
  .icon
    width: 24px
    height: 24px
    margin: 0 8px
    color: rgb(32, 48, 48)
    opacity: 0.8
    &.adjust
      &.reverse
      transition: all 0.1s linear
</style>