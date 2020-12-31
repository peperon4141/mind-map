<template lang="pug">
#operator-down
  #left
    font-awesome-icon.icon.reactive(icon="map-marker-alt")
    font-awesome-icon.icon.reactive(icon="search-plus" @mousedown="expand")
    font-awesome-icon.icon.reactive(icon="search-minus" @mousedown="shrink")
  #center
  #right
    font-awesome-icon.icon.reactive(:icon="['far','star']")
</template>

<script>
export default {
  components: {
    separater: () => import('@/icons/separater.vue')
  }
}
</script>

<style lang="sass" scoped >
#operator-down
  position: absolute
  display: flex
  justify-content: space-between
  padding: 0 4px
  height: 36px
  background-color: var(--sub)
  box-shadow: 0 0 2px 0 var(--shadow)
  border-radius: 4px
  #left, #right, #center
    display: flex
    align-items: center
    > *
      color: var(--accent)
      margin: 0 8px
  #center
    margin: auto
  .icon
    opacity: 0.8
    cursor: pointer
    &:hover
      opacity: 1.0
</style>
