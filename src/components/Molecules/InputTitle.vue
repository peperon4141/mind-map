<template lang="pug">
#inputtitle.vinput
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
#inputtitle.vinput
  position: relative
  height: 30px
  background-color: var(--darkColor)
  margin: 3px 0
  box-shadow: 0 2px 2px -2px var(--darkestColor)
  > .icon
    margin-right: 8px
  > *
    color: var(--lightColor)
</style>