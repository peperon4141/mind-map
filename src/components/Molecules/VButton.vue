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

<style lang="sass">
@import "@/assets/InputComponents.sass"
#vbutton.vinput
  .title
    display: flex
    justify-content: center
    align-items: center
    height: 100%
    color: var(--main)
    background-color: var(--accent)
    border-radius: 2px
    flex-grow: 1
    box-shadow: 0 0 2px 0 var(--shadow)
</style>