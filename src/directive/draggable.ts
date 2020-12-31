function drag() {
  let element: any = null
  let initialItemPosition: any | null = null
  let initialDownPosition: any | null = null

  function noop() {}

  function onDown(e: any, callback: Function) {
    const event = e.hasOwnProperty('changedTouches') ? e.changedTouches[0] : e
    element = event.currentTarget
    initialItemPosition = { x: parseFloat(element.style.left), y: parseFloat(element.style.top) }
    initialDownPosition = { x: event.clientX, y: event.clientY }
    event.preventDefault()
    event.stopPropagation()
    callback(event)
  }

  function onMove(e: any, callback: Function) {
    if (!element || !initialItemPosition || !initialDownPosition) return
    const event = e.hasOwnProperty('changedTouches') ? e.changedTouches[0] : e
    element.style.left = `${initialItemPosition.x + event.clientX - initialDownPosition.x}px`
    element.style.top = `${initialItemPosition.y + event.clientY - initialDownPosition.y}px`
    event.preventDefault()
    event.stopPropagation()
    callback(event, element)
  }

  function onUp(e: any, callback: Function) {
    element = null
    const event = e.hasOwnProperty('changedTouches') ? e.changedTouches[0] : e
    initialItemPosition = null
    initialDownPosition = null
    event.preventDefault()
    event.stopPropagation()
    callback(event)
  }

  return {
    bind: function(el: any, binding: any) {
      // Down
      el.addEventListener('mousedown', (e: any) => {
        const callback = binding.value && binding.value.down ? binding.value.down : noop
        onDown(e, callback)
      })

      // Move
      document.addEventListener('mousemove', (e) => {
        const callback = binding.value && binding.value.move ? binding.value.move : noop
        onMove(e, callback)
      })

      // Up
      const upCallback = binding.value && binding.value.up ? binding.value.up : noop
      document.addEventListener('mouseup', (e) => {
        onUp(e, upCallback)
      })
      document.addEventListener('mouseleave', (e) => {
        onUp(e, upCallback)
      })
    }
  }
}
export default drag()
