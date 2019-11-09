<template lang="pug">
transition(appear)
  #popup(@click.stop)
    slot
    button(@click="close") 閉じる
</template>

<script>
export default {
  methods: {
    close: function(e){
      this.$emit('close')
    },
  },
}
</script>

<style lang="sass">
#popup
  position: absolute
  background-color: var(--main)
  padding: 20px
  border-radius: 4px
  z-index: 100
.modal-enter, .modal-leave-active 
  opacity: 0
</style>