<template lang="pug">
  svg.connector
    svg-path(
      :points="points"
      :controls="controls"
      :stroke="'black'"
      fill="none"
    )
</template>

<script>
export default {
  components: {
    SvgPath: () => import('@/components/Svgs/SvgPath')
  },
  data: function() {
    return {};
  },
  props: {
    startItem: Object,
    endItem: Object
  },
  computed: {
    start: function() {
      return {
        x: this.startItem.left + this.startItem.width,
        y: this.startItem.top + this.startItem.height / 2,
      }
    },
    end: function() {
      return {
        x: this.endItem.left,
        y: this.endItem.top + this.endItem.height / 2
      }
    },
    points: function() {
      return [this.start, this.end]
    },
    controls: function() {
      return [
        {
          x: this.start.x + 20,
          y: this.start.y
        },
        {
          x: this.end.x - 20,
          y: this.end.y
        }
      ]
    }
  }
};
</script>
