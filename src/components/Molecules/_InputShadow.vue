<template lang="pug">
#shadow.vinput
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
#shadow.vinput
  height: 4px
  background-color: var(--darkestColor)
</style>