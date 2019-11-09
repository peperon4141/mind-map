<template lang="pug">
#drawer(:class="{ expanding: expanding }")
  #uppermenu
    #left
      font-awesome-icon.icon.reactive(icon="map-marker-alt")
      font-awesome-icon.icon.reactive(icon="search-plus")
      font-awesome-icon.icon.reactive(icon="search-minus")
      separater
      font-awesome-icon.icon.reactive(icon="undo-alt")
      font-awesome-icon.icon.reactive(icon="redo-alt")
      separater
      font-awesome-icon.icon.reactive(icon="border-all")
      separater
      font-awesome-icon.icon.reactive(icon="sort-amount-down")
      font-awesome-icon.icon.reactive(icon="sort-amount-up")
      separater
      font-awesome-icon.icon.reactive(icon="sort-alpha-down")
      font-awesome-icon.icon.reactive(icon="sort-alpha-up")
    #center
    #right
      font-awesome-icon.icon.reactive(
        icon="file-download"
        @mousedown="download"
      )
      separater
      template
        font-awesome-icon.icon.reactive(
          v-if="expanding"
          icon="compress-arrows-alt"
          @mousedown="expanding = false"
        )
        font-awesome-icon.icon.reactive(
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
          stroke="var(--accent)"
          :stroke-width="(num % 10 === 0) ? 1.0 : 0.5"
          stroke-opacity="0.4"
        )
        path(
          v-for="num of 100" :key="`h-${num}`"
          :d="`M 0 ${10 * num} H1000`"
          stroke="var(--accent)"
          :stroke-width="(num % 10 === 0) ? 1.0 : 0.5"
          stroke-opacity="0.4"
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
      font-awesome-icon.icon.reactive(icon="map-marker-alt")
      font-awesome-icon.icon.reactive(icon="search-plus")
      font-awesome-icon.icon.reactive(icon="search-minus")
    #center
      span All rights reserved Soichiro.
    #right
      font-awesome-icon.icon.reactive(:icon="['far','star']")
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
    download(e){
      var svg = document.querySelector("svg#mainSvg");
      var svgData = new XMLSerializer().serializeToString(svg);
      var canvas = document.createElement("canvas");
      canvas.width = svg.width.baseVal.value;
      canvas.height = svg.height.baseVal.value;

      var ctx = canvas.getContext("2d");
      var image = new Image;
      image.onload = function(){
          ctx.drawImage( image, 0, 0 );
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.href = canvas.toDataURL("image/png");
          a.setAttribute("download", "image.png");
          a.dispatchEvent(new CustomEvent("click"));
      }
      image.src = "data:image/svg+xml;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(svgData))); 
    }
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

    separater: () => import('@/icons/separater.vue'),
  }
}
</script>

<style lang="sass" scoped >
#drawer
  position: relative
  margin: 16px
  background-color: var(--main)
  box-shadow: 0 0 2px 0 var(--shadow)
  border-radius: 4px
  transition: all 0.2s ease-out 0s
  z-index: 100
  &.expanding
    position: absolute !important
    margin: 0 !important
    border-radius: 0 !important
    top: 0 !important
    left: 0 !important
    width: 100% !important
    height: 100% !important
    // transition: all 0.3s ease
    transition: all 0.2s ease-out 0s
  #uppermenu, #lowermenu
    display: flex
    padding: 0 4px
    height: 40px
    background-color: var(--sub)
    #left, #right, #center
      display: flex
      align-items: center
      > *
        color: var(--accent)
        margin: 0 8px
      > .separater
        width: 1px
        height: 24px
        // margin-top: 4px
        border-radius: 50%
        background-color: var(--accent)
        opacity: 0.3
    #center
      margin: auto
    .icon
      opacity: 0.8
      &:hover
        opacity: 1.0
  #uppermenu
    border-radius: 4px 4px 0 0
    border-bottom: 1px solid var(--accent)
  #lowermenu
    border-radius: 0 0 4px 4px
    border-top: 1px solid var(--accent)
  #canvas
    position: relative
    height: calc(100% - 80px)
    #background
      overflow: hidden
      background-color: var(--main)
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
