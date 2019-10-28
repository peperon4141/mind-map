<template lang="pug">
  div(
    style="width: 1024px; height: 800px; background-color: tomato;"
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
      ref="svg"
    )
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
        :onMouseDownHandler="onMouseDownHandler"
      )
</template>

<script lang="ts">
// import { Component, Vue } from 'vue-property-decorator';
import vrect from '@/components/VRect.vue'
import vpath from '@/components/VPath.vue'
import { mapGetters } from 'vuex'
import store from '@/store'

const Tweakpane = require('tweakpane')

type Point = {
  x: number
  y: number
}

export default {
  components: {
    vrect,
    vpath
  },
  data: function() {
    return {
      offset: { x: 0, y: 0 },
      size: { x: 800, y: 600 },
      dragItem: null,
      dragOffset: { x: 0, y: 0 },
      mousePosition: { x: 0, y: 0 }
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
  mounted: function() {
    const pane = new Tweakpane();
    pane.addInput(this, 'offset', { x: {min: -300, max: 300}, y: {min: -300, max: 300} })
    pane.addInput(this, 'size', { x: {min: 400, max: 2000}, y: {min: 400, max: 2000} })
    const btn = pane.addButton({
      title: 'create',
    }).on('click', () => {
      store.commit('create', {
        from: Object.keys(this.allElements)[0]
      })
    });
  },
  methods: {
    pathStartPoint(id: string): Point {
      const parent = this.findElement(id)
      return {
        x: parent.position.x + parent.size.x,
        y: parent.position.y + parent.size.y / 2
      }
    },
    pathEndPoint(id: string): Point {
      const child = this.findElement(id)
      return {
        x: child.position.x,
        y: child.position.y + child.size.y / 2
      }
    },
    onMouseMoveHandler: function(e: MouseEvent) {
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
      this.dragItem = event.target as HTMLElement

      const p = this.mousePointToSVGPoint(
        this.$refs.svg,
        this.dragItem,
        { x: event.clientX, y: event.clientY }
      )
      this.dragOffset = {
        x: p.x - this.dragItem.getAttribute('x'),
        y: p.y - this.dragItem.getAttribute('y')
      }

      this.$forceUpdate()
      event.preventDefault();
    },
    mousePointToSVGPoint(svgElement, targetElement, point: any){
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
