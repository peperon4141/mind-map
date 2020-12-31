<template lang="pug">
#file
  inputtitle(:title="'file'")
  numinput(:title="'num'" :value="10")
  inputseperater(:line="false")
  textinput(:title="'text'" :value="'test'")
  inputseperater(:line="true")
  vbutton(title="button")
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import store from '@/store'
export default {
  components: {
    inputtitle: () => import('@/components/Molecules/InputTitle.vue'),
    numinput: () => import('@/components/Molecules/NumInput.vue'),
    textinput: () => import('@/components/Molecules/TextInput.vue'),
    inputseperater: () => import('@/components/Molecules/InputSeperater.vue'),
    vbutton: () => import('@/components/Molecules/VButton.vue'),
  }
}
</script>

<style lang="sass">
</style>