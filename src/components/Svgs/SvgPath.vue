<template lang="pug">
  path.svgpath(
    :d="path"
    :stroke="color"
    :stroke-width="width"
    :stroke-opacity="opacity"
    fill="none"
  )
</template>

<script>
export default {
  props: {
    points: { type: Array, required: true },
    controls: { type: Array },
    color: { type: String, default: 'black' },
    width: { type: Number, default: 0.8 },
    opacity: { type: Number, default: 1 }
  },
  computed: {
    path: function() {
      let drawPoints = []
      drawPoints.push(`M ${this.points[0].x},${this.points[0].y}`) // 始点
      if (this.controls) {
        drawPoints.push(`C ${this.controls[0].x},${this.controls[0].y}`) // 制御点1 
        drawPoints.push(`${this.controls[1].x},${this.controls[1].y}`) // 制御点2
      }
      for(let i = 1; i < this.points.length; i++) {
        drawPoints.push(`${this.points[i].x},${this.points[i].y}`) // 終点
      }
      return drawPoints.join(' ')
    }
  }
}
</script>
