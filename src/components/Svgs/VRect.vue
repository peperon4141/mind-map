<template>
  <g
    :id="id"
    @mousedown="click"
    @mouseover="over"
    ref="rect"
  >
    <rect
      :id="id"
      :x="position.x" :y="position.y"
      rx="1" ry="1"
      :width="size.x" :height="size.y"
      stroke="black" stroke-width="0.3" stroke-opacity="1.0"
      fill="#B3E5FC" fill-opacity="1"
      stroke-dasharray="0" stroke-dashoffset="0"
    />
    <text
      dominant-baseline="central"
      text-anchor="middle"
      ref="text"
      :x="position.x + size.x / 2"
      :y="position.y + size.y / 2"
      font-size="10" font-weight="500"
      fill="#000000"
      text-decoration
      contentEditable="true"
    >{{text}}</text>
  </g>
</template>

<script>
export default {
  data: function() {
    return {
      loading: true
    }
  },
  props: {
    id: String,
    text: String,
    position: Object,
    size: Object,
  },
  computed: {
    textRect: function() {
      if (!this.$refs.text) return null
      return this.$refs.text.getBoundingClientRect()
    },
    textWidth: function() { 
      if (!this.textRect) return 0
      console.log(`height---${this.textRect['width']}`)
      return this.textRect['width']
    },
    textHeight: function() {
      if (!this.textRect) return 0
      console.log(`height---${this.textRect['height']}`)
      return this.textRect['height']
    },
  },
  methods: {
    click (e) {
      console.log(`--click----${this.id}`)
      e['id'] = this.id
      this.$emit('click', e)
      const rect = this.$refs.rect
      const pos = rect.getBoundingClientRect()
      // let div = document.querySelector('div#hoverItem')
      // div.style.left = `${pos.left - 4}px`
      // div.style.top = `${pos.top - 4}px`
      // div.style.width = `${pos.width}px`
      // div.style.height = `${pos.height}px`
      // console.log({ x: rect.clientLeft, y: rect.clientTop })
      // console.log({ width: rect.clientWidth, height: rect.clientHeight })
    },
    over (e) {
    }
  },
  mounted: function() {
    this.loading = false
  }
}
</script>

<style lang="sass" scoped>
g
  cursor: pointer
  rect
    &:hover
      fill: green
</style>
