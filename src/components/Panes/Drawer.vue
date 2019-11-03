<template lang="pug">
#drawer
  #uppermenu
    #left
      font-awesome-icon(icon="map-marker-alt")
      font-awesome-icon(icon="search-plus")
      font-awesome-icon(icon="search-minus")
      .separater
      font-awesome-icon(icon="border-all")
    #right
      font-awesome-icon(icon="expand-arrows-alt")
      font-awesome-icon(icon="compress-arrows-alt")
  vsvgrenderer
  inputwrapper
    inputtitle(title="view")
    numinput(v-model="space" title="space")
    //- inputseperater(:line="true")
    twodinput(v-model="offset" title="offset" :option="{ x: {min: -300, max: 300, step: 1}, y: {min: -300, max: 300, step: 1} }")
    twodinput(v-model="size" title="size" :option="{ x: {min: 400, max: 1000, step: 1}, y: {min: 400, max: 1000, step: 1} }")
    textinput(v-model="string" title="string")
    inputtitle(title="map")
    vbutton(title="create" @click="click")
    vbutton(title="delete" @click="click")
    vbutton(title="insert" @click="click")
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'

export default {
  data: () => {
    return {
      offset: {x: 0, y: 0},
      size: {x: 800, y: 600},
      space: 20,
      string: 'sample',
    }
  },
  computed: {
    ...mapGetters([
      'allElements'
    ])
  },
  methods: {
    click(e) {
      store.commit('create', {
        from: Object.keys(this.allElements)[0]
      })
    },
  },
  components: {
    inputwrapper: () => import('@/components/Atoms/InputWrapper.vue'),

    inputtitle: () => import('@/components/Molecules/InputTitle.vue'),
    numinput: () => import('@/components/Molecules/NumInput.vue'),
    textinput: () => import('@/components/Molecules/TextInput.vue'),
    twodinput: () => import('@/components/Molecules/2DInput.vue'),
    inputseperater: () => import('@/components/Molecules/InputSeperater.vue'),
    vbutton: () => import('@/components/Molecules/VButton.vue'),

    vnavbar: () => import('@/components/Organisms/VNavBar.vue'),
    vsidebar: () => import('@/components/Organisms/VSideBar.vue'),
    vfooter: () => import('@/components/Organisms/VFooter.vue'),

    vsvgrenderer: () => import('@/components/Svgs/VSvgRenderer.vue'),
  }
}
</script>

<style lang="sass" scoped >
#drawer
  margin: 8px
  box-shadow: 0 0 4px 0 var(--darkColor)
  border-radius: 4px 4px 0 0
  background-color: var(--lightestColor)
  #uppermenu
    display: flex
    justify-content: space-between
    border-radius: 4px 4px 0 0
    border-bottom: 1px solid var(--middleColor)
    padding: 0 4px
    height: 40px
    #left, #right
      display: flex
      align-items: center
      > *
        color: var(--middleColor)
        margin: 0 8px
      > .separater
        width: 1px
        height: 24px
        // margin-top: 4px
        border-radius: 50%
        background-color: var(--middleColor)
        opacity: 0.3
</style>
