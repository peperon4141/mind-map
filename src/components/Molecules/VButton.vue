<template lang="pug">
#vbutton.vinput
  .title.reactive(@click="click") {{title}}
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
    color: var(--main)
    background-color: var(--accent)
    border-radius: 2px
    flex-grow: 1
    text-align: center
    box-shadow: 0 0 2px 0 var(--shadow)
</style>