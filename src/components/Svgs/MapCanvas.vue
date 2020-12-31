<template lang="pug">
  #mapcanvas(
    :style="{ '--canvasWidth': `${2000 * scale}px`, '--canvasHeight': `${2000 * scale}px` }"
  )
    background
    #main(
      ref="svg"
      :style="{ transform: `scale(${scale},${scale})` }"
    )
      svg
        svg-path.handle(
          v-if="points"
          :points="points"
          :stroke="'red'"
          :width="3"
          :opacity="0.3"
          fill="none"
        )
      connector(
        v-for="(connector, key) in this.connectors"
        :key="key"
        :id="key"
        :startItem="findItem(connector.from)"
        :endItem="findItem(connector.to)"
      )
      item(
        v-for="(item, key) in this.items"
        v-drag="{ down: changeCurrent, move: changePosition }"
        v-events="{ dblclick: onEditStart }"
        :key="key"
        :id="key"
        :item="item"
      )
    modal(v-if="editing" @close="onEditEnd")
      #editor
        textarea(:value="input" @input="updateText")
        div(class="markdown-body" v-html="convertToHtml(input)")
    operator-up
    operator-down
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
    ...mapState('map', ['currentId']),
    ...mapGetters('map', ['items', 'connectors']),
    ...mapState('user', ['scale']),
    points() {
      if (!this.currentId) return null
      const style = this.items[this.currentId]
      return [
        { x: style.left - 5, y: style.top - 5 },
        { x: style.left + style.width + 15, y: style.top - 5 },
        { x: style.left + style.width + 15, y: style.top + style.height + 15 },
        { x: style.left - 5, y: style.top + style.height + 15 },
        { x: style.left - 5, y: style.top -5 },
      ]
    }
  },
  methods: {
    updateText(e) { this.input = e.target.value },
    convertToHtml(markedText) {
      return marked(markedText)
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
    findItem(id) {
      return this.items[id]
    },
    changeCurrent(event) {
      this.$store.commit('map/update', { 'currentId': event.currentTarget.id })
    },
    changePosition(event, element) {
      if (!this.currentId) return
      this.$store.commit('map/updateElem', {
        id: this.currentId,
        value: {
          left: parseFloat(element.style.left),
          top: parseFloat(element.style.top)
        }
      })
    },
    onEditStart(item, e) {
      const elem = this.items[this.currentId]
      this.input = elem.content
      this.editing = true
    },
    onEditEnd(e) {
      this.editing = false
      this.$store.commit('map/updateElem', {
        id: this.currentId,
        value: { 
          content: this.input
        }
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
    hightLighters(item) {
      const id = this.currentId
      if (!id) return []
      const style = this.items[id]
      const diff = 5
      return [
        // [`${pos.x - diff},${pos.y + diff}`,`${pos.x - diff},${pos.y - diff}`,`${pos.x + diff},${pos.y - diff}`].join(' ')
        [`${style.left - diff},${style.top + diff}`,`${style.left - diff},${style.top - diff}`,`${style.left + diff},${style.top - diff}`].join(' ')
      ]
    },
  },
  components: {
    Connector: () => import('@/components/Svgs/Connector'),
    Item: () => import('@/components/Svgs/Item'),
    background: () => import('@/components/Svgs/Background'),

    SvgPath: () => import('@/components/Svgs/SvgPath'),

    OperatorUp: () => import('@/components/Panes/OperatorUp'),
    OperatorDown: () => import('@/components/Panes/OperatorDown'),


    // scrollbar: () => import('@/components/Atoms/ScrollBar.vue'),
    modal: () => import('@/components/Atoms/Modal.vue'),
  },
}
</script>

<style lang="sass" scoped>
@import url("../markdown.css")

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
    .item
      border: 1px solid blue
      background: skyblue
      border-radius: 2px
      height: auto !important
      padding: 4px
  #background
    z-index: 0
  #operator-up
    z-index:  1000
    top: 8px
    right: 8px
  #operator-down
    z-index:  1000
    bottom: 8px
    right: 8px
#editor
  width: 500px
  height: 400px
  display: flex
  flex-direction: row
  > *
    width: 50%
</style>