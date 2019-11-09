<template lang="pug">
  #vsvgrenderer(
    contenteditable
  )
    svg(
      xmlns="http://www.w3.org/2000/svg"
      data-v-03e17f23
      font-family="sans-serif"
      :viewBox="viewBoxPosition"
      @mousemove="onMouseMoveHandler"
      @mouseleave="onMouseEndHandler"
      @mouseup="onMouseEndHandler"
      id="mainSvg"
      ref="svg"
    )
      //- filter#drop-shadow
      //-   feGaussianBlur(result="blurOut" in="offOut" stdDeviation="10")
      //-   feBlend(in="SourceGraphic" in2="blurOut" mode="normal")
      //-   //- feGaussianBlur(in="SourceAlpha" stdDeviation='10')
      vpath(
        v-for="(line, key) in allLines"
        :key="key"
        :id="key"
        :start="pathStartPoint(line.from)"
        :end="pathEndPoint(line.to)"
      )
      vrect(
        v-for="(elem, key) in allElements"
        :key="key"
        :id="key"
        :position="elem.position"
        :text="elem.text"
        :size="elem.size"
        @click="onMouseDownHandler"
      )
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  components: {
    vrect: () => import('@/components/Svgs/VRect.vue'),
    vpath: () => import('@/components/Svgs/VPath.vue'),
  },
  data: function() {
    return {
      offset: { x: 0, y: 0 },
      size: { x: 800, y: 800 },
      dragItem: null,
      dragOffset: { x: 0, y: 0 },
      mousePosition: { x: 0, y: 0 },
      currentId: null
    }
  },
  computed: {
    ...mapGetters([
      'findElement',
      'allElements',
      'allLines'
    ]),
    viewBoxPosition: function() {
      const params = [this.offset.x, this.offset.y, this.size.x, this.size.y]
      return params.join(' ')
    },
  },
  methods: {
    pathStartPoint(id) {
      const parent = this.findElement(id)
      return {
        x: parent.position.x + parent.size.x,
        y: parent.position.y + parent.size.y / 2
      }
    },
    pathEndPoint(id) {
      const child = this.findElement(id)
      return {
        x: child.position.x,
        y: child.position.y + child.size.y / 2
      }
    },
    onMouseMoveHandler: function(e) {
      if (!this.dragItem) return
      const event = (e.type === 'mousemove') ? e : e.changedTouches[0]

      const p = this.mousePointToSVGPoint(
        this.$refs.svg,
        this.dragItem,
        { x: event.clientX, y: event.clientY }
      )
      const newPosition = {
        x: p.x - this.dragOffset.x,
        y: p.y - this.dragOffset.y
      }
      const id = this.dragItem.getAttribute('id')
      store.commit('updateElementPosition', {
        id: id,
        position: newPosition
      })

      event.preventDefault()
    },
    onMouseEndHandler(e) {
      this.dragItem = null
    },
    onMouseDownHandler(e) {
      const event = (e.type === 'mousedown') ? e : e.changedTouches[0]
      this.dragItem = event.target
      store.commit('setCurrent', e.id)

      const p = this.mousePointToSVGPoint(
        this.$refs.svg,
        this.dragItem,
        { x: event.clientX, y: event.clientY }
      )
      this.dragOffset = {
        x: p.x - this.dragItem.getAttribute('x'),
        y: p.y - this.dragItem.getAttribute('y')
      }
      event.preventDefault();
    },
    mousePointToSVGPoint(svgElement, targetElement, point){
      const svgPoint = svgElement.createSVGPoint()
      svgPoint.x = point.x
      svgPoint.y = point.y

      const cmt = targetElement.getScreenCTM()
      const p = svgPoint.matrixTransform(cmt.inverse())
      return {x: p.x, y: p.y}
    }
  }
}
</script>

<style lang="sass" scoped>
#vsvgrenderer
  flex-grow: 1
</style>