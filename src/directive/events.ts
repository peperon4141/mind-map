function events() {
  function noop() {}

  return {
    bind: function(el: any, binding: any) {
      const EVENTS = [
        'mousedown',
        'mousemove',
        'mouseup',
        'dblclick'
      ]
      if (!binding.value) return
      EVENTS.forEach( event => {
        if (!binding.value[event]) return
        el.addEventListener(event, (e: any) => {
          const callback = binding.value[event] || noop
          callback(e)
        })
      })
    }
  }
}
export default events()
