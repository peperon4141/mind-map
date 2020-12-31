<template lang="pug">
#history
  inputtitle(title="history")
  div(
    v-for="history in history"
    style="margin-left: 40px"
  )
    font-awesome-icon.icon.reactive(icon="chevron-right")
    span {{history.action}} {{ history.content }}
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import store from '@/store'
export default {
  components: {
    inputtitle: () => import('@/components/Molecules/InputTitle.vue')
  },
  computed: {
    ...mapState('map', ['elements', 'lines', 'info']),
    ...mapGetters('map', ['items', 'connectors', 'history']),
  }
}
</script>

<style lang="sass">
</style>