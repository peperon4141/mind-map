<template lang="pug">
#numinput.vinput
  span.title {{title}}
  range(
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
    range: () => import('@/components/Atoms/Range.vue'),
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
        if (this.value === value) return
        this.$emit('input', parseInt(value))
      }
    }
  }
}
</script>

<style lang="sass">
@import "@/assets/InputComponents.sass"
#numinput.vinput
  #vinput
    flex-grow: 1
</style>