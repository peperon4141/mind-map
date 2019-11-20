<template lang="pug">
  #svgcanvas(
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
        @dblclick="onEditStart"
      )
    svg#background(
      preserveAspectRatio="xMinYMin"
      font-family="sans-serif"
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
    modal(v-if="editing" @close="onEditEnd")
      #editor
        textarea(:value="input" @input="update")
        div(v-html="compiledMarkdown")
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

    const upCallback = this.onUp.bind(this)
    document.addEventListener('mouseupleave', upCallback)

    const moveCallback = this.onMove.bind(this)
    document.addEventListener('mousemove', moveCallback)

    // new SimpleMDE({ element: document.getElementById("editor") })
    // var simplemde = new SimpleMDE({ element: document.getElementById("editor") });
  },
  computed: {
    ...mapGetters([
      'findElement',
      'allElements',
      'allLines'
    ]),
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true })
    },
    hightLighters() {
      console.log('----ffd')
      const id = store.state.map.currentId
      if (!id) return []
      const elem = store.getters.findElement(id)
      const pos = elem.position
      const size = elem.size
      const diff = 5
      return [
        [`${pos.x - diff},${pos.y + diff}`,`${pos.x - diff},${pos.y - diff}`,`${pos.x + diff},${pos.y - diff}`].join(' ')
      ]
    },
  },
  methods: {
    update(e) {
      this.input = e.target.value
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
    onDown(event) {
      this.dragItem = event.target
      store.commit('map/setCurrent', event.id)

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
      store.commit('map/updateElem', {
        id: this.$store.state.map.currentId,
        key: 'position',
        value: {
          x: p.x - this.dragOffset.x,
          y: p.y - this.dragOffset.y
        }
      })
      event.preventDefault()
    },
    onUp(e) {
      this.dragItem = null
    },
    onEditStart(e) {
      this.editing = true
    },
    onEditEnd(e) {
      console.log('--------double')
      this.editing = false
      this.$store.commit('map/updateElem', {
        id: this.$store.state.map.currentId,
        key: 'text',
        value: this.input
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
    vpath: () => import('@/components/Svgs/VPath.vue'),

    scrollbar: () => import('@/components/Atoms/ScrollBar.vue'),
    modal: () => import('@/components/Atoms/Modal.vue'),
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