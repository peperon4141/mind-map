<template lang="pug">
input#range.reactive(
  type="range"
  v-model="updateValue"
  :min="option.min"
  :max="option.max"
  :step="option.step"
)
</template>

<script>
export default {
  props: {
    value: { type: Number, required: true },
    option: { type: Object, required: false, default() {
      return { min: 0, max: 100, step: 1 }
    }}
  },
  computed: {
    updateValue: {
      get () { return this.value },
      set (value) {
        if (this.value !== value) this.$emit('input', parseInt(value))
      }
    }
  }
}
</script>

<style lang="sass">
input#range
  appearance: none
  height: 2px
  width: 80px
  background-color: var(--trans)
  border-radius: 1px
  &::-webkit-slider-thumb
    appearance: none
    cursor: pointer
    position: relative
    width: 16px
    height: 16px
    display: block
    background-color: var(--accent)
    border-radius: 2px
</style>