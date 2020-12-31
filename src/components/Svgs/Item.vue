<template lang="pug">
.item(
  class="markdown-body"
  :class="item.class"
  :style="style"
  v-html="html"
)
</template>

<script>
import marked from 'marked'

export default {
  props: {
    item: { type: Object, required: true }
  },
  computed: {
    html: function() {
      return marked(this.item.content)
    },
    style: function() {
      return {
        position: 'absolute',
        left: `${this.item.left}px`,
        top: `${this.item.top}px`,
        width: `${this.item.width}px`,
        height: `${this.item.height}px`
      }
    }
  }
}
</script>
