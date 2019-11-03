<template lang="pug">
#vbutton.vinput
  .title(@click="click") {{title}}
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
  },
  methods: {
    click(e) {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/InputComponents.sass"
#vbutton.vinput
  .title
    color: var(--darkerColor)
    background-color: var(--lightColor)
    border-radius: 2px
    flex-grow: 1
    text-align: center
</style>