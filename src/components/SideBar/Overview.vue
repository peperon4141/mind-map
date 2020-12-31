<template lang="pug">
#overview
  inputtitle(title="overview")
  .scrollBox
    div(
      v-for="item in list"
      :style="{'margin-left': `${20 * item.depth}px`}"
    )
      font-awesome-icon.icon.reactive(icon="chevron-right")
      span {{ items[item.id].content }}
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
    list() {
      let list = {}
      Object.keys(this.connectors).forEach(lineKey => {
        const connector = this.connectors[lineKey]
        list[connector.from] = list[connector.from] || {}
        list[connector.to] = list[connector.to] || {}
        list[connector.from][connector.to] = list[connector.to]
      })

      let listElements = []
      function add(parentId, depth) {
        listElements.push({ id: parentId, depth: depth })
        const childIds = Object.keys(list[parentId])
        childIds.forEach(childId => {
          add(childId, depth + 1)
        })
      }
      // const rootId = this.info.root
      const rootId = Object.keys(this.items)[0]
      add(rootId, 1)
      return listElements
    }
  },
  methods: {
  }
}
</script>

<style lang="sass">
</style>