<template lang="pug">
  #mapcanvas(
    :style="{ '--canvasWidth': `${2000 * scale}px`, '--canvasHeight': `${2000 * scale}px` }"
  )
    #main(
      ref="svg"
      :style="{ transform: `scale(${scale},${scale})` }"
    )
      svgpath(
        v-for="(line, key) in this.lines"
        :key="key"
        :id="key"
        :start="pathStartPoint(line.from)"
        :end="pathEndPoint(line.to)"
      )
      .rect(
        v-drag="{ down: onDown, move: onMove }"
        v-for="(elem, key) in this.elements"
        :key="key"
        :id="key"
        :style="getRectStyle(elem)"
        @dblclick.prevent="onEditStart"
        v-html="convertToHtml(elem.text)"
      )
    svg#background(
      preserveAspectRatio="xMinYMin"
      font-family="sans-serif"
      :style="{ transform: `scale(${scale},${scale})` }"
    )
      path(
        v-for="num of size.x / lineInterval" :key="`v-${num}`"
        :d="`M ${lineInterval * num} 0 V${size.x}`"
        stroke="var(--accent)"
        :stroke-width="(num % 10 === 0) ? 0.6 : 0.3"
        stroke-opacity="0.4"
      )
      path(
        v-for="num of size.y / lineInterval" :key="`h-${num}`"
        :d="`M 0 ${lineInterval * num} H${size.y}`"
        stroke="var(--accent)"
        :stroke-width="(num % 10 === 0) ? 0.6 : 0.3"
        stroke-opacity="0.4"
      )
      polyline(
        v-for="item in hightLighters"
        :points="item"
        stroke="var(--accent)" fill="none"
        stroke-width="2"
        stroke-opacity="0.4"
        stroke-linejoin="round"
        stroke-linecap="round"
      )
    modal(v-if="editing" @close="onEditEnd")
      #editor
        textarea(:value="input" @input="updateText")
        div(v-html="convertToHtml(input)")
</template>

<script>
// https://sample.atmarkit.jp/fux/1206/01/sample.xhtml
import { mapState, mapGetters } from 'vuex'
import store from '@/store'
import marked from 'marked'

export default {
  data: function() {
    return {
      lineInterval: 10,
      dragItem: null,
      dragOffset: { x: 0, y: 0 },
      mousePosition: { x: 0, y: 0 },
      rightBtn: { top: '0px', height: '20px' },
      buttomBtn: { left: '0px', width: '20px' },
      editing: false,
      input: '# hello'
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
  },
  computed: {
    ...mapState('map', ['elements', 'lines', 'currentId']),
    ...mapState('user', ['scale']),
    hightLighters() {
      const id = this.currentId
      if (!id) return []
      const elem =  this.elements[id]
      const pos = elem.position
      const size = elem.size
      const diff = 5
      return [
        [`${pos.x - diff},${pos.y + diff}`,`${pos.x - diff},${pos.y - diff}`,`${pos.x + diff},${pos.y - diff}`].join(' ')
      ]
    },
  },
  methods: {
    updateText(e) { this.input = e.target.value },
    convertToHtml(markedText) { return marked(markedText) },
    // update(e) { this.input = e.target.value },
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
      const parent = this.elements[id]
      return {
        x: parent.position.x + parent.size.x,
        y: parent.position.y + parent.size.y / 2
      }
    },
    pathEndPoint(id) {
      const child = this.elements[id]
      return {
        x: child.position.x,
        y: child.position.y + child.size.y / 2
      }
    },
    getRectStyle(rect) {
      return {
        position: 'absolute',
        left: `${rect.position.x}px`,
        top: `${rect.position.y}px`,
        width: `${rect.size.x}px`,
        height: `${rect.size.y}px`,
      }
    },
    onDown(event) {
      this.$store.commit('map/update', { 'currentId': event.currentTarget.id })
    },
    onMove(event, item) {
      // const canvasRect = this.$refs.svg.getBoundingClientRect()
      // const item = event.currentTarget
      this.$store.commit('map/updateElem', {
        id: this.currentId,
        value: {
          'position': { x: parseFloat(item.style.left), y: parseFloat(item.style.top)}
        }
      })
    },
    onEditStart(e) {
      const elem = this.elements[this.currentId]
      this.input = elem.text
      this.editing = true
    },
    onEditEnd(e) {
      console.log('--------double--end')
      this.editing = false
      this.$store.commit('map/updateElem', {
        id: this.currentId,
        value: { 'text': this.input }
      })
    },
    mousePointToSVGPoint(svgElement, targetElement, point){
      const svgPoint = svgElement.createSVGPoint()
      svgPoint.x = point.x
      svgPoint.y = point.y

      const cmt = targetElement.getScreenCTM()
      const p = svgPoint.matrixTransform(cmt.inverse())
      return {x: p.x, y: p.y}
    },
  },
  components: {
    vrect: () => import('@/components/Svgs/VRect.vue'),
    svgpath: () => import('@/components/Svgs/Path.vue'),

    scrollbar: () => import('@/components/Atoms/ScrollBar.vue'),
    modal: () => import('@/components/Atoms/Modal.vue'),
  },
}
</script>

<style lang="sass" scoped>
$handleWidth: 9px
#mapcanvas
  overflow: scroll
  position: relative
  cursor: move
  #main, #background
    position: absolute
    top: 0
    left: 0
    width: var(--canvasWidth)
    height: var(--canvasHeight)
  #main
    z-index: 100
    /deep/ svg
      position: absolute
      width: var(--canvasWidth)
      height: var(--canvasHeight)
    .rect
      border: 1px solid blue
      background: skyblue
      border-radius: 2px
      height: auto !important
      padding: 4px
  #background
    z-index: 0
  /deep/ .right
    top: 0
    right: 0
  /deep/ .bottom
    left: 0
    bottom: 0
</style>