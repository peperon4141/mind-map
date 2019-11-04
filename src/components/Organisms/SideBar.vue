<template lang="pug">
#sidebar
  #icons
    font-awesome-icon.icon(
      v-for="item in menus"
      :key="item.name"
      :class="{active: item.name === current.name, [item.name]: true}"
      @click="click(item)"
      :icon="item.icon"
    )
  #contents(v-show="showContents")
    .menu(v-if="'overview' === current.name")
      inputtitle(title="outline")
      div(style="margin-left: 20px")
        font-awesome-icon.icon(icon="chevron-right")
        span elem-1
      div(style="margin-left: 40px")
        font-awesome-icon.icon(icon="chevron-right")
        span elem-2
      div(style="margin-left: 40px")
        font-awesome-icon.icon(icon="chevron-right")
        span elem-3
      div(style="margin-left: 40px")
        font-awesome-icon.icon(icon="chevron-right")
        span elem-4
    .menu(v-if="'history' === current.name")
      inputtitle(title="history")
      div(
        v-for="history in allHistory"
        style="margin-left: 40px"
      )
        font-awesome-icon.icon(icon="chevron-right")
        span {{history.type}}
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
  },
  methods: {
    click(nextMenu) {
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
  background-color: var(--darkerColor)
  box-shadow: 0 0 8px 0 var(--darkColor)
  margin-right: 8px
  #icons
    display: flex
    flex-direction: column
    width: 64px
    background-color: var(--darkColor)
    align-items: center
    .icon
      color: var(--lightColor)
      width: 24px
      height: 24px
      margin: 16px
      opacity: 0.5
      &.active
        opacity: 1
      &.setting
        margin-top: auto
  #contents
    width: 240px
    .menu
      > *
        width: 100%
        color: var(--lightColor)
</style>