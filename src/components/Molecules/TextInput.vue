<template lang="pug">
#textinput.vinput
  span.title {{title}}
  vinput.input(
    :type="'text'"
    v-model="updateValue"
  )
</template>

<script>
export default {
  components: {
    vinput: () => import('@/components/Atoms/VInput.vue'),
  },
  props: {
    title: { type: String, required: true },
    value: { type: String, required: false, default: '' }
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

<style lang="sass" scoped>
@import "@/assets/InputComponents.sass"
#textinput.vinput
  .input
    flex-grow: 1
</style>