<template lang="pug">
  #svgcanvas(
    contenteditable
  )
    svg#mainSvg(
      font-family="sans-serif"
      preserveAspectRatio="xMinYMin"
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
      //- <polyline points="90,60 90,10 140,10"
      //-     stroke="black" fill="none"
      //-     stroke-width="20"
      //-     stroke-linejoin="round" />
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
// https://sample.atmarkit.jp/fux/1206/01/sample.xhtml
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  data: function() {
    return {
      lineInterval: 10,
      dragItem: null,
      dragOffset: { x: 0, y: 0 },
      mousePosition: { x: 0, y: 0 },
      currentId: null,
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
    onDown(event) {
      this.dragItem = event.target
      store.commit('setCurrent', event.id)

      const p = this.mousePointToSVGPoint(
        this.$refs.svg,
        this.dragItem,
        { x: event.clientX, y: event.clientY }
      )
      const itemRect = this.dragItem.getBoundingClientRect()
      this.dragOffset = {
        x: p.x - this.dragItem.getAttribute('x'),
        y: p.y - this.dragItem.getAttribute('y')
      }
      event.preventDefault();
    },
    onMove: function(e) {
      if (!this.dragItem) return
      const event = e.hasOwnProperty('changedTouches') ? e.changedTouches[0] : e

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
    onUp(e) {
      this.dragItem = null
    },
    mousePointToSVGPoint(svgElement, targetElement, point){
      const svgPoint = svgElement.createSVGPoint()
      svgPoint.x = point.x
      svgPoint.y = point.y

      const cmt = targetElement.getScreenCTM()
      const p = svgPoint.matrixTransform(cmt.inverse())
      return {x: p.x, y: p.y}
    },
    downRightBtn(e) {

    }
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
#svgcanvas
  overflow: scroll
  position: relative
  cursor: move
  #mainSvg, #background
    position: absolute
    top: 0
    left: 0
    width: 2000px
    height: 2000px
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