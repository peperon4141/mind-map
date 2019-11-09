<template lang="pug">
#twodinput.vinput
  span.title {{title}}
  .button.reactive(@click="showPopUp" style="position: relative;")
    svg(xmlns="http://www.w3.org/2000/svg" width="20px" height="20px")
      path(d="M10 3 V15" stroke="var(--main)" stroke-width="1.5" stroke-linecap="round")
      path(d="M4 9 H16" stroke="var(--main)" stroke-width="1.5" stroke-linecap="round")
    popup(v-if="show" @close="show=false" :top="popupPosition.top" :left="popupPosition.left")
      .panel(
        @mousedown.self="onDown"
        @mousemove.self="onMove"
      )
        .circle(
          :style="pointPosition"
        )
  vinput(type="number" v-model="updateX" :width="inputWidth" :option="option.x")
  vinput(type="number" v-model="updateY" :width="inputWidth" :option="option.y")
</template>

<script>
export default {
  components: {
    popup: () => import('@/components/Atoms/Popup.vue'),
    vinput: () => import('@/components/Atoms/VInput.vue'),
  },
  data: function() {
    return {
      show: false,
      popupPosition: { top: 0, left: 0 },
      moving: false,
      mouseOffset: {x: 0, y: 0, width: 100, height: 100},
      inputWidth: 96
    }
  },
  props: {
    title: { type: String, required: true },
    value: { 
      type: Object, required: true, default() {
        return { x: 0, y: 0 } 
      } 
    },
    option: {
      type: Object, required: false, default() {
        return {
          x: { min: 0, max: 100, step: 1 },
          y: { min: 0, max: 100, step: 1 }
        }
      }
    },
  },
  mounted: function() {
    window.onmouseup = this.onUp
    window.onclick = this.onUp
  },
  methods: {
    showPopUp: function(e) {
      this.show = !this.show
      if (this.show) {
        this.popupPosition.left = e.clientX
        this.popupPosition.top = e.clientY
      }
    },
    onDown(e) {
      const event = (e.type === 'mousedown') ? e : e.changedTouches[0]
      this.moving = true
      this.mouseOffset = {
        x: event.offsetX,
        y: event.offsetY,
        width: event.target.offsetWidth,
        height: event.target.offsetHeight,
      }
      this.updateX = this.mouseOffset.x * this.option.x.max / this.mouseOffset.width
      this.updateY = this.mouseOffset.y * this.option.y.max / this.mouseOffset.height
      event.preventDefault()
    },
    onMove(e){
      if (!this.moving) return
      const event = (e.type === 'mousemove') ? e : e.changedTouches[0]
      this.mouseOffset.x = event.offsetX
      this.mouseOffset.y = event.offsetY
      this.updateX = this.mouseOffset.x * this.option.x.max / this.mouseOffset.width
      this.updateY = this.mouseOffset.y * this.option.y.max / this.mouseOffset.height
      event.preventDefault()
    },
    onUp(e){
      this.moving = false
    }
  },
  computed: {
    pointPosition() {
      return {
        left: `${this.mouseOffset.width * this.value.x / this.option.x.max}px`,
        top: `${this.mouseOffset.height * this.value.y / this.option.y.max}px`
      }
    },
    updateX: {
      get () { return this.value.x },
      set (x) {
        if (this.value.x === x) return
        this.value.x = x
        this.$emit('input', Object.assign({}, this.value))
      }
    },
    updateY: {
      get () { return this.value.y },
      set (y) {
        if (this.value.y === y) return
        this.value.y = y
        this.$emit('input', Object.assign({}, this.value))
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "@/assets/InputComponents.sass"
#twodinput.vinput
  .button
    background-color: var(--accent)
    flex-basis: 20px
    border-radius: 2px
    box-shadow: 0 0 2px 0 var(--shadow)
    svg
      position: static
      width: 20px
      height: 20px
    .circle
      position: relative
      width: 6px
      height: 6px
      border-radius: 100%
      background-color: black

  #vinput
    flex-grow: 1
  // .panel
  //   position: static
  //   width: 176px
  //   height: 176px
  //   background-color: var(--accent)
</style>