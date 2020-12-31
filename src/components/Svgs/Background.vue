<template lang="pug">
#background
  svg(
    preserveAspectRatio="xMinYMin"
    font-family="sans-serif"
  )
    svg-path(
      v-for="num of SIZE.x / LINE_INTERVAL" :key="`v-${num}`"
      :points="[{x: LINE_INTERVAL * num, y: 0}, {x: LINE_INTERVAL * num, y: SIZE.x}]"
      :width="(num % 10 === 0) ? 0.6 : 0.3"
      :opacity="0.4"
      stroke="var(--accent)"
    )
    svg-path(
      v-for="num of SIZE.y / LINE_INTERVAL" :key="`h-${num}`"
      :points="[{x: 0, y: LINE_INTERVAL * num}, {x: SIZE.y, y: LINE_INTERVAL * num}]"
      :width="(num % 10 === 0) ? 0.6 : 0.3"
      :opacity="0.4"
      stroke="var(--accent)"
    )
</template>

<script>
const LINE_INTERVAL = 10
const SIZE = { x: 2000, y: 2000 }

export default {
  data: function() {
    return {
      LINE_INTERVAL: LINE_INTERVAL,
      SIZE: SIZE
    }
  },
  components: {
    SvgPath: () => import('@/components/Svgs/SvgPath')
  }
}
</script>

<style lang="sass" scoped>
#background
  svg
    width: 100%
    height: 100%
</style>