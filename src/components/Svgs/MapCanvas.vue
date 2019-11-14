<template lang="pug">
#mapcanvas
  #mainSvg(
    :style="getCanvasStyle()"
    @mousemove="onMove"
    ref="main"
  )
    svg(
      v-for="(line, key) in allLines"
      xmlns="http://www.w3.org/2000/svg"
      :style="getPathStyle(line)"
    )
      vpath(
        :key="key"
        :id="key"
        :start="{x: 0, y: 0}"
        :end="{ x: pathEndPoint(line.to).x - pathStartPoint(line.from).x, y: pathEndPoint(line.to).y - pathStartPoint(line.from).y }"
      )
    .rect(
      v-for="(elem, key) in allElements"
      :key="key"
      :id="key"
      :style="getStyle(elem.position, elem.size)"
      :text="elem.text"
      :size="elem.size"
      @mousedown="onDown"
    )
  svg#background(
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMin"
    font-family="sans-serif"
  )
    path(
      v-for="num of size.x / lineInterval" :key="`v-${num}`"
      :d="`M ${lineInterval * num} 0 V${size.x}`"
      stroke="var(--accent)"
      :stroke-width="(num % 10 === 0) ? 1.0 : 0.5"
      stroke-opacity="0.4"
    )
    path(
      v-for="num of size.y / lineInterval" :key="`h-${num}`"
      :d="`M 0 ${lineInterval * num} H${size.y}`"
      stroke="var(--accent)"
      :stroke-width="(num % 10 === 0) ? 1.0 : 0.5"
      stroke-opacity="0.4"
    )
  //- scrollbar.right(
  //-   mode="vertical"
  //-   v-model="offset.y"
  //-   :length="view.y"
  //-   :max="size.y"
  //- )
  //- scrollbar.bottom(
  //-   mode="horizontal"
  //-   v-model="offset.x"
  //-   :length="view.x"
  //-   :max="size.x"
  //- )
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  data: function() {
    return {
      lineInterval: 10,
      dragElem: null,
      position: { x: 0, y: 0 },
      diff: { x: 0, y: 0 },
      mousePosition: { x: 0, y: 0 },
      currentId: null,
      // draging: false,
      rightBtn: { top: '0px', height: '20px' },
      buttomBtn: { left: '0px', width: '20px' },
    }
  },
  props: {
    offset: { type: Object, required: true },
    size: { type: Object, required: true },
    view: { type: Object, required: true },
  },
  watch: {
    'size': {
      deep: true,
      handler: function(val) {
        this.updateSize()
      }
    }
  },
  mounted() {
    this.updateSize()
    const upCallback = this.onUp.bind(this)
    document.addEventListener('mouseupleave', upCallback)

    const moveCallback = this.onMove.bind(this)
    document.addEventListener('mousemove', moveCallback)
  },
  computed: {
    ...mapGetters([
      'findElement',
      'allElements',
      'allLines'
    ]),
  },
  methods: {
    getStyle(position, size) {
      return {
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${size.x}px`,
        height: `${size.y}px`,
        'background-color': 'red',
      }
    },
    getCanvasStyle() {
      return { position: 'relative', width: `${this.size.x}px`, height: `${this.size.y}px` } 
    },
    getPathStyle(line) {
      const startPosition = this.pathStartPoint(line.from)
      const endPosition = this.pathEndPoint(line.to)
      return {
        position: 'absolute',
        left: Math.min(startPosition.x, endPosition.x), top: Math.min(startPosition.y, endPosition.y),
        width: Math.abs(endPosition.x - startPosition.x), height: Math.abs(endPosition.y - startPosition.y),
      }
    },
    calcViewBox() {
      return [this.offset.x, this.offset.y, this.view.x, this.view.y].join(', ')
    },
    updateSize() {
      if (this.$refs.bottomHandle && this.$refs.rightHandle) {
        this.buttomBtn = {
          left: `${this.offset.x / this.size.x}px`,
          width: `${this.$refs.bottomHandle.clientWidth * this.size.x / this.size.x}px`
        } 
        this.rightBtn = {
          top: `${this.offset.y / this.size.y}px`,
          height: `${this.$refs.rightHandle.clientHeight * this.size.y / this.size.y}px`
        }
      }
    },
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
    onDown(e) {
      console.log('---down')
      const event = e.hasOwnProperty('changedTouches') ? e.changedTouches[0] : e
      this.currentId = event.target.getAttribute('id')
      store.commit('setCurrent', event.target.getAttribute('id'))
      const itemRect = event.target.getBoundingClientRect()
      this.diff = {
        x: event.clientX - itemRect.left,
        y: event.clientY - itemRect.top,
      }
      event.preventDefault()
    },
    onMove: function(e) {
      if (!this.currentId) return
      const event = e.hasOwnProperty('changedTouches') ? e.changedTouches[0] : e
      const mainRect = this.$refs.main.getBoundingClientRect()
      const newPosition = {
        x: event.clientX - mainRect.left - this.diff.x,
        y: event.clientY - mainRect.top - this.diff.y,
      }
      store.commit('updateElementPosition', {
        id: this.currentId,
        position: newPosition
      })

      event.preventDefault()
    },
    onUp(e) {
      this.currentId = null
      this.dragItem = null
    },
  },
  components: {
    vrect: () => import('@/components/Svgs/VRect.vue'),
    vpath: () => import('@/components/Svgs/VPath.vue'),

    scrollbar: () => import('@/components/Atoms/ScrollBar.vue'),
  },
}
</script>

<style lang="sass" scoped>
$handleWidth: 9px
#mapcanvas
  overflow: scroll
  position: relative
  cursor: move
  width: 100%
  height: 100%
  #mainSvg, #background
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
  #mainSvg
    z-index: 100
  #background
    z-index: 0
  /deep/ .right
    top: 0
    right: 0
  /deep/ .bottom
    left: 0
    bottom: 0
</style>