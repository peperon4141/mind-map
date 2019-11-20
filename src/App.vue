<template>
  <router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      event: null
    }
  },
  mounted() {
    this.event = new CustomEvent("mouseupleave")
    document.addEventListener("mouseup", e => document.dispatchEvent(this.event))
    document.addEventListener("mouseleave", e => document.dispatchEvent(this.event))

    this.event = new CustomEvent("mouseupleave")
    document.addEventListener("mouseup", e => document.dispatchEvent(this.event))
    document.addEventListener("mouseleave", e => document.dispatchEvent(this.event))

    history.pushState(null, null)
    window.onpopstate = function(e) {
      history.pushState(null, null)
    }
  }
}
</script>

<style lang="sass">
// html, body
//   height: 100% !important
//   margin: 0
//   padding: 0
//   overflow: hidden

// *
//   font-weight: 200
//   outline: none
</style>
