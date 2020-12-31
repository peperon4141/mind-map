<template lang="pug">
#operator-up
  #left
    font-awesome-icon.icon.reactive(icon="undo-alt" v-tooltip="{content: 'undo'}")
    font-awesome-icon.icon.reactive(icon="redo-alt" v-tooltip="{content: 'redo'}")
    separater
    font-awesome-icon.icon.reactive(icon="border-all")
    separater
    font-awesome-icon.icon.reactive(icon="sort-amount-down")
    font-awesome-icon.icon.reactive(icon="sort-amount-up")
    separater
    font-awesome-icon.icon.reactive(icon="sort-alpha-down")
    font-awesome-icon.icon.reactive(icon="sort-alpha-up")
  #center
  #right
    font-awesome-icon.icon.reactive(
      icon="file-download"
    )
    separater
    font-awesome-icon.icon.reactive(
      icon="compress-arrows-alt"
    )
</template>

<script>
export default {
  components: {
    separater: () => import('@/icons/separater.vue')
  }
}
</script>

<style lang="sass" scoped >
#operator-up
  position: absolute
  display: flex
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
