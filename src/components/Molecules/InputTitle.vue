<template lang="pug">
#inputtitle.vinput
  font-awesome-icon.icon(icon="chevron-right")
  span.header {{title}}
  //- .inputshadow
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
  }
}
</script>

<style lang="sass">
@import "@/assets/InputComponents.sass"
#inputtitle
  position: relative
  height: 30px
  background-color: var(--sub)
  margin: 3px 0
  position: relative
  border-bottom: 1px solid var(--accent)
  // box-shadow: 0 0 2px 0 var(--shadow)
  // z-index: 10
  display: flex
  flex-direction: row
  &:first-of-type
    // box-shadow: 0 4px 4px -4px var(--shadow)
  > *
    color: var(--accent)
  > .icon
    margin-right: 8px
  > .header
    display: inline-block
    flex-grow: 1
    text-align: center
    // padding-right: 16px
  // > *
  //   color: var(--background)
  // .inputshadow
  //   position: absolute
  //   height: 3px
  //   left: 0
  //   bottom: 0
  //   width: 100%
</style>