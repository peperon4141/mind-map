<template lang="pug">
input#vinput(
  :type="type"
  v-model="updateValue"
  :min="option.min"
  :max="option.max"
  :step="option.step"
)
</template>

<script>
export default {
  props: {
    value: { type: [String, Number], required: true },
    type: { type: 'text' | 'number', required: false, default: 'text' },
    option: { type: Object, required: false, default() {
      return { min: 0, max: 100, step: 1 }
    }}
  },
  computed: {
    updateValue: {
      get () { return this.value },
      set (value) {
        if (this.value !== value) this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="sass">
input#vinput
  box-sizing: border-box
  width: 100%
  height: 100%
  color: var(--accent)
  // background-color: var(--trans)
  border: none
  border-radius: 2px
  padding: 0 4px
  border: 1px solid var(--background)
  &:focus, &:active
    outline: none
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
    -webkit-appearance: none
    margin: 0
</style>