<template lang="pug">
  svg
    path(
      :d="path"
      stroke="black"
      stroke-width="0.8"
      stroke-opacity="0.8"
      fill="none"
    )
</template>

<script>
export default {
  data: function() {
    return {};
  },
  props: {
    start: Object,
    end: Object
  },
  computed: {
    path: function() {
      // console.log(this.start)
      // console.log(this.end)
      const points = [
        `M ${this.start.x},${this.start.y}`, // 始点
        `C ${this.start.x + (this.end.x - this.start.x) / 4 },${this.start.y}`, // 始点の制御点
        `${this.end.x - (this.end.x - this.start.x) / 4},${this.end.y}`, // 終点の制御点
        `${this.end.x},${this.end.y}` // 終点
      ];
      return points.join(" ");
    }
  }
};
</script>
