<template>
  <div class="about">
    <div
      xmlns="http://www.w3.org/1999/xhtml"
      data-v-03e17f23
      data-v-9cea11f0
      class="svg-canvas-wrapper"
      style="width: 1024px; height: 724px;"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-v-03e17f23
        font-family="sans-serif"
        :viewBox="viewBoxPosition"
      >
        <path
          data-v-9cea11f0
          data-v-03e17f23
          stroke="black"
          stroke-width="1"
          fill="none"
          d="M 42.890625 14 L 62.890625 14 L 62.890625 -7.5 L 82.890625 -7.5"
        />
        <path
          data-v-9cea11f0
          data-v-03e17f23
          stroke="black"
          stroke-width="1"
          fill="none"
          d="M 42.890625 14 L 62.890625 14 L 62.890625 35.5 L 82.890625 35.5"
        />
        <vrect :x="-42.890625" :y="0" :text="'aaa'"></vrect>
        <vrect :x="82.890625" :y="-20" :text="'bbb'"></vrect>
        <vrect :x="82.890625" :y="24" :text="'ccc'"></vrect>
      </svg>
    </div>
  </div>
</template>

<script>
import vrect from '../components/VRect'
const Tweakpane = require('tweakpane')
// const PARAMS = {
//   speed: 0.5,
//   offset: {x: -300, y: -200}
// };

export default {
  components: {
    vrect
  },
  data: function() {
    return {
      PARAMS: null
    }
  },
  computed: {
    viewBoxPosition: function() {
      console.log(this.PARAMS)
      if (!this.PARAMS) return `0 0 0 0`
      // return "-280.0079918390548 -219 660.5316086781096 467.0164889481947"
      const params = [
        this.PARAMS.offset.x,
        this.PARAMS.offset.y,
        this.PARAMS.size.x,
        this.PARAMS.size.y
      ]
      return params.join(' ')
    }
  },
  mounted: function() {
    const pane = new Tweakpane();
    this.PARAMS = {
      speed: 0.5,
      offset: {x: -300, y: -200},
      size: { x: 600, y: 400}
    }
    pane.addInput(this.PARAMS, 'speed')
    pane.addInput(this.PARAMS, 'offset', {
      x: {min: -300, max: 300},
      y: {min: -300, max: 300}
    })
    pane.addInput(this.PARAMS, 'size', {
      width: {min: 0, max: 800},
      height: {min: 0, max: 800}
    })
    const btn = pane.addButton({
      title: 'Increment',
    }).on('click', () => {
      console.log('tes');
    });
  }
}
</script>
