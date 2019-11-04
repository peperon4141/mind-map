<template lang="pug">
#drawer(:class="{ expanding: expanding }")
  #uppermenu
    #left
      font-awesome-icon(icon="map-marker-alt")
      font-awesome-icon(icon="search-plus")
      font-awesome-icon(icon="search-minus")
      .separater
      font-awesome-icon(icon="border-all")
    #right
      //- font-awesome-icon(icon="expand-arrows-alt")
      //- .separater
      template
        font-awesome-icon(
          v-if="expanding"
          icon="compress-arrows-alt"
          @mousedown="expanding = false"
        )
        font-awesome-icon(
          v-else
          icon="expand-arrows-alt"
          @mousedown="expanding = true"
        )
  #canvas
    #background
      svg(
        xmlns="http://www.w3.org/2000/svg"
        data-v-03e17f23
        font-family="sans-serif"
      )
        path(
          v-for="num of 100" :key="`v-${num}`"
          :d="`M ${10 * num} 0 V1000`"
          stroke="var(--darkerColor)"
          :stroke-width="(num % 10 === 0) ? 1.0 : 0.5"
          stroke-opacity="0.3"
        )
        path(
          v-for="num of 100" :key="`h-${num}`"
          :d="`M 0 ${10 * num} H1000`"
          stroke="var(--darkerColor)"
          :stroke-width="(num % 10 === 0) ? 1.0 : 0.5"
          stroke-opacity="0.3"
        )
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
  #lowermenu
    #left
      font-awesome-icon(icon="map-marker-alt")
      font-awesome-icon(icon="search-plus")
      font-awesome-icon(icon="search-minus")
    #right
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
      expanding: false,
    }
  },
  computed: {
    ...mapGetters([
      'currentId'
    ])
  },
  methods: {
    click(e) {
      store.commit('create', {
        from: this.currentId
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

    vsvgrenderer: () => import('@/components/Svgs/VSvgRenderer.vue'),
  }
}
</script>

<style lang="sass" scoped >
#drawer
  position: relative
  margin: 8px
  box-shadow: 0 0 8px -2px var(--darkestColor)
  border-radius: 4px
  background-color: var(--lightestColor)
  // height: 80%
  // transition: all 0.3s ease
  // transition: transform 0.2s linear 0s
  &.expanding
    position: absolute !important
    margin: 0 !important
    border-radius: 0 !important
    top: 0 !important
    left: 0 !important
    width: 100% !important
    height: 100% !important
    // transition: all 0.3s ease
    transition: all 0.2s linear 0s
  #uppermenu, #lowermenu
    display: flex
    justify-content: space-between
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
  #uppermenu
    border-radius: 4px 4px 0 0
    border-bottom: 1px solid var(--middleColor)
  #lowermenu
    border-radius: 0 0 4px 4px
    border-top: 1px solid var(--middleColor)
  #canvas
    position: relative
    height: calc(100% - 80px)
    #background
      overflow: hidden
      background-color: var(--lightestColor)
      width: 100%
      height: 100%
      position: absolute
      top: 0
      left: 0
      svg
        width: 100%
        height: 100%
    /deep/ #vsvgrenderer
      overflow: hidden
      width: 100%
      height: 100%
      position: absolute
      top: 0
      left: 0
    
</style>
