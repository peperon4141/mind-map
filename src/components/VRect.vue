<template>
  <g>
    <rect
      :x="x" :y="y"
      rx="3" ry="3"
      width="60.515625" height="23"
      stroke="black" stroke-width="1"
      fill="#B3E5FC" fill-opacity="1"
      stroke-dasharray="0" stroke-dashoffset="0"
    />
    <text
      :x="x" :y="y"
      font-size="10" font-weight="500"
      fill="#000000"
      text-decoration
    >{{text}}</text>
  </g>
</template>

<script>
export default {
  data: function() {
    return {
    }
  },
  props: {
    text: String,
    x: Number,
    y: Number,
  },
  computed: {
  },
  mounted: function() {
  }
}
</script>
