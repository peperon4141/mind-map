<template lang="pug">
#barBack(
  ref="barBack"
  contenteditable="false"
  :class="{[mode]: true, active: active,  hover: hover}"
)
  #handle(
    ref="handle"
    :style="getStyle()"
    @mousedown.self="down"
  )
</template>

<script>
const VERTICAL = 'vertical'
export default {
  data() {
    return {
      active: false,
      diff: 0,
      offset: 0,
      hover: false
    }
  },
  props: {
    value: { type: Number, required: true },
    max: { type: Number, required: true, default: 100 },
    length: { type: Number, required: true, default: 20 },
    mode: { type: String, required: false, default: VERTICAL },
  },
  computed: {
    isVertical() {
      return this.mode === VERTICAL
    }
  },
  mounted() {
    const upCallback = this.up.bind(this)
    document.addEventListener('mouseupleave', upCallback)

    const moveCallback = this.move.bind(this)
    document.addEventListener('mousemove', moveCallback)

    const hoverCallback = function(){ this.hover = true }.bind(this)
    this.$refs.barBack.addEventListener('mouseenter', hoverCallback)

    const leaveCallback = function(){ this.hover = false }.bind(this)
    this.$refs.barBack.addEventListener('mouseleave', leaveCallback)
    this.$forceUpdate()
  },
  methods: {
    getStyle() {
      let barLength = 20
      if (this.$refs.barBack) {
        const barBackRect = this.$refs.barBack.getBoundingClientRect()
        barLength = barBackRect[this.isVertical ? 'height' : 'width'] * this.length / this.max
      }
      return {
        [this.isVertical ? 'top' : 'left']: `${this.offset}px`,
        [this.isVertical ? 'height' : 'width']: `${barLength}px`
      }
    },
    down: function(e) {
      this.active = true
      this.diff = this.isVertical ? e.offsetY : e.offsetX
    },
    move: function(e) {
      if (!this.active) return
      const barBackRect = this.$refs.barBack.getBoundingClientRect()
      const handleRect = this.$refs.handle.getBoundingClientRect()
      const offset = e[this.isVertical ? 'clientY' : 'clientX'] - barBackRect[this.isVertical ? 'top' : 'left'] - this.diff
      const maxOffset = barBackRect[this.isVertical ? 'height' : 'width'] - handleRect[this.isVertical ? 'height' : 'width']
      this.offset = Math.min( Math.max(0, offset), maxOffset)
      const newValue = this.max * (handleRect[this.isVertical ? 'top' : 'left'] - barBackRect[this.isVertical ? 'top' : 'left']) / maxOffset
      // console.log(newValue)
      if (this.value !== newValue) this.$emit('input', newValue)
    },
    up: function(e) {
      this.active = false
    }
  },
}
</script>

<style lang="sass">
$narrow: 8px
$wide: 12px
#barBack
  position: absolute
  background-color: var(--trans)
  z-index: 2000
  #handle
    position: absolute
    margin-left: 1px
    background-color: var(--accent)
    box-shadow: 0 0 2px 0 var(--shadow)
    border-radius: calc(#{$narrow} / 2)
    opacity: 0.3
  &.vertical
    width: calc(#{$narrow} + 4px)
    height: 100%
    #handle
      width: $narrow
      height: 20px
    &:hover, &.active
      width: calc(#{$wide} + 4px)
      #handle
        width: $wide
        opacity: 1
        border-radius: calc(#{$wide} / 2)
  &.horizontal
    width: 100%
    height: calc(#{$narrow} + 4px)
    #handle
      width: 20px
      height: $narrow
    &:hover, &.active
      height: calc(#{$wide} + 4px)
      #handle
        height: $wide
        opacity: 1
        border-radius: calc(#{$wide} / 2)
</style>