<template lang="pug">
.inputtitle.vinput
  font-awesome-icon.icon(icon="chevron-right")
  span.header {{title}}
  .inputshadow
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/InputComponents.sass"
.inputtitle.vinput
  position: relative
  background-color: var(--darkColor)
  margin-bottom: 3px
  > *
    color: var(--lightColor)
  > .inputshadow
    position: absolute
    height: 3px
    width: 100%
    bottom: 0
    left: 0
    margin: 0
    background-color: var(--darkerColor)
    box-shadow: 0 1px 2px 0px var(--darkestColor) inset
</style>