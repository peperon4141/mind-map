<template>
  <g
    :id="id"
    @mousedown="onDown"
    @dblclick="onDblClick"
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
    onDown (e) {
      console.log(`--click----${this.id}`)
      const event = e.hasOwnProperty('changedTouches') ? e.changedTouches[0] : e
      event['id'] = this.id
      this.$emit('mousedown', event)
    },
    onDblClick (e) {
      console.log(`--onDblClick----${this.id}`)
      const event = e.hasOwnProperty('changedTouches') ? e.changedTouches[0] : e
      event['id'] = this.id
      this.$emit('dblclick', event)
    },
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
