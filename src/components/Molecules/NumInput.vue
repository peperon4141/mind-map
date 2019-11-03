<template lang="pug">
#numinput.vinput
  span.title {{title}}
  input.input(
    type="range"
    v-model="updateValue"
    :min="option.min"
    :max="option.max"
    :step="option.step"
  )
  vinput(
    type="number"
    v-model="updateValue"
    :option="{ min: option.min, max: option.max, step: option.step }"
  )
</template>

<script>
export default {
  components: {
    vinput: () => import('@/components/Atoms/VInput.vue'),
  },
  props: {
    title: { type: String, required: true },
    value: { type: Number, required: true },
    option: { type: Object, required: false, default() {
      return { min: 0, max: 100, step: 1 }
    }},
    lightColor: { type: String, required: false, default: 'rgba(200,202,208,0.4)' },
    middleColor: { type: String, required: false, default: 'rgba(200,202,208)' },
    darkColor: { type: String, required: false, default: 'rgb(33, 37, 41)' },
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

<style lang="sass" scoped>
@import "@/assets/InputComponents.sass"
#numinput.vinput
  .input
    appearance: none
    height: 2px
    flex-grow: 1
    background-color: var(--darkColor)
    border-radius: 1px
    &:focus, &:active
      outline: none
    &::-webkit-slider-thumb
      appearance: none
      cursor: pointer
      position: relative
      width: 12px
      height: 12px
      display: block
      background-color: var(--lightColor)
      border-radius: 2px
  #vinput
    min-width: 80px
</style>