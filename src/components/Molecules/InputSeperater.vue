<template lang="pug">
#inputseperater.vinput
  .line(v-if="line")
</template>

<script>
export default {
  props: {
    line: { type: Boolean, required: false, default: true },
  }  
}
</script>

<style lang="sass" scoped>
@import "@/assets/InputComponents.sass"
#inputseperater.vinput
  height: 8px
  .line
    height: 2px
    width: 100%
    border-radius: 1px
    background-color: var(--darkestColor)
    opacity: 0.8
    margin-left: 2px
</style>