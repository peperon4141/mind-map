<template lang="pug">
#sidebar
  #icons
    font-awesome-icon.icon.reactive(
      v-for="item in menus"
      :key="item.name"
      :class="{active: item.name === current.name, [item.name]: true}"
      @click="click(item)"
      :icon="item.icon"
    )
  #contents(v-show="showContents")
    .menu(v-if="'overview' === current.name")
      inputtitle(title="overview")
      .scrollBox
        div(
          v-for="item in list"
          :style="{'margin-left': `${20 * item.depth}px`}"
        )
          font-awesome-icon.icon.reactive(icon="chevron-right")
          span {{ allElements[item.id].text }}
    .menu(v-if="'history' === current.name")
      inputtitle(title="history")
      div(
        v-for="history in allHistory"
        style="margin-left: 40px"
      )
        font-awesome-icon.icon.reactive(icon="chevron-right")
        span {{history.type}} {{ history.elem.text }}
    .menu(v-if="'file' === current.name")
      inputtitle(title="file")
    .menu(v-if="'setting' === current.name")
      inputtitle(title="setting")
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  components: {
    inputtitle: () => import('@/components/Molecules/InputTitle.vue'),
    numinput: () => import('@/components/Molecules/NumInput.vue'),
    textinput: () => import('@/components/Molecules/TextInput.vue'),
    twodinput: () => import('@/components/Molecules/2DInput.vue'),
    inputseperater: () => import('@/components/Molecules/InputSeperater.vue'),
    vbutton: () => import('@/components/Molecules/VButton.vue'),
  },
  data () {
    return {
      menus: [
        { name: 'overview', icon: 'align-justify' },
        { name: 'history', icon: 'history' },
        { name: 'file', icon: 'file-export' },
        { name: 'setting', icon: 'cog' },
      ],
      current: null,
      showContents: true
    }
  },
  computed: {
    ...mapGetters([
      'findElement',
      'allElements',
      'allLines',
      'map',
      'allHistory'
    ]),
    list() {
      let list = {}
      Object.keys(this.$store.state.map.lines).forEach(lineKey => {
        const line = this.$store.state.map.lines[lineKey]
        list[line.from] = list[line.from] || {}
        list[line.to] = list[line.to] || {}
        list[line.from][line.to] = list[line.to]
      })

      let listElements = []
      function add(parentId, depth) {
        listElements.push({ id: parentId, depth: depth })
        const childIds = Object.keys(list[parentId])
        childIds.forEach(childId => {
          add(childId, depth + 1)
        })
      }
      const rootId = this.$store.state.map.info.root
      add(rootId, 1)
      return listElements
    }
  },
  methods: {
    click(nextMenu) {
      // console.log(this.map)
      if (this.current === nextMenu) {
        this.showContents = !this.showContents
      } else {
        this.current = nextMenu
        this.showContents = true
      }
    }
  },
  created() {
    this.click(this.menus[0])
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
  margin-right: 8px
  #icons
    display: flex
    flex-direction: column
    width: 48px
    background-color: var(--sub)
    align-items: center
    // box-shadow: 0 0 2px 0 var(--shadow)
    border-right: 1px solid var(--accent)
    .icon
      box-sizing: content-box
      color: var(--accent)
      width: 24px
      height: 24px
      padding: 11px
      opacity: 0.8
      &.setting
        margin-top: auto
      &.active
        border-left: 2px solid var(--accent)
      // &.active
      //   opacity: 1
      // &:hover
      //   opacity: 1
      //   transform: scale(1.02)
      //   transition-duration: 0.3s
  #contents
    width: 240px
    .menu
      > *
        width: 100%
        color: var(--accent)
        &:first-of-type
          margin-top: 0
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