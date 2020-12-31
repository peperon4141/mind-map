<template lang="pug">
#sidebar
  ul#icons
    li(
      v-for="item in MENUS"
      :key="item.name"
      :class="{active: (current && item.name === current.name), [item.name]: true}"
    )
      font-awesome-icon.icon(
        @click="click(item)"
        :icon="item.icon"
      )
  div#contents(v-show="showContents")
    .menu(v-if="current && 'overview' === current.name")
      overview
    .menu(v-if="current && 'history' === current.name")
      history
    .menu(v-if="current && 'file' === current.name")
      file
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import store from '@/store'
const MENUS = [
  { name: 'overview', icon: 'align-justify' },
  { name: 'history', icon: 'history' },
  { name: 'file', icon: 'file-export' }
]
export default {
  components: {
    inputtitle: () => import('@/components/Molecules/InputTitle.vue'),

    overview: () => import('@/components/SideBar/Overview.vue'),
    history: () => import('@/components/SideBar/History.vue'),
    File: () => import('@/components/SideBar/File.vue')
  },
  data () {
    return {
      MENUS: MENUS,
      current: null,
      showContents: true
    }
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
    click(menu) {
      // console.log(this.map)
      if (this.current === menu) {
        this.current = null
        this.showContents = !this.showContents
      } else {
        this.current = menu
        this.showContents = true
      }
    }
  },
  created() {
    this.click(this.MENUS[0])
  },
  mounted() {
    this.current = this.MENUS[0]
  }
}
</script>

<style lang="sass">
#sidebar
  display: flex
  flex-direction: row
  height: 100%
  background-color: var(--main)
  box-shadow: 0 0 2px 0 var(--shadow)
  #icons
    display: flex
    flex-direction: column
    width: 48px
    background-color: var(--sub)
    align-items: center
    // box-shadow: 0 0 2px 0 var(--shadow)
    .icon
      box-sizing: content-box
      color: var(--accent)
      width: 24px
      height: 24px
      padding: 11px
      opacity: 0.8
      &.active
        border-left: 2px solid var(--accent)
      // &.active
      //   opacity: 1
      // &:hover
      //   opacity: 1
      //   transform: scale(1.02)
      //   transition-duration: 0.3s
  #contents
    width: var(--sideBarWidth)
    border-left: 1px solid var(--accent)
    .menu
      > *
        color: var(--accent)
    .scrollBox
      height: 300px
      overflow: scroll
      border-bottom: 1px solid var(--accent)
  // #border
  //   width: 0px
  //   height: 100%
  //   background-color: var(--sub)
  //   box-shadow: 0 0 2px 0 var(--shadow)
</style>