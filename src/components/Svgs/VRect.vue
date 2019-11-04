<template>
  <g @mousedown="click" :id="id">
    <rect
      :id="id"
      :x="position.x" :y="position.y"
      rx="3" ry="3"
      :width="size.x" :height="size.y"
      stroke="black" stroke-widthidth="1" stroke-opacity="0.5"
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
    }
  },
  mounted: function() {
    this.loading = false
  }
}
</script>
