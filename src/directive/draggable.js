function drag() {
  let item = null
  let prevPosition = null

  function noop() {}

  function onDown(e, callback) {
    // console.log('-----down')
    const event = e.hasOwnProperty('changedTouches') ? e.changedTouches[0] : e
    item = event.currentTarget
    // console.log('-----down:' + item.style.left + '/' + item.style.top)
    prevPosition = { x: event.clientX, y: event.clientY }
    event.preventDefault()
    callback(event)
  }

  function onMove(e, callback) {
    if (!item || !prevPosition) return
    const event = e.hasOwnProperty('changedTouches') ? e.changedTouches[0] : e
    const diff = { x: event.clientX - prevPosition.x, y: event.clientY - prevPosition.y }
    // console.log(`diff: ${JSON.stringify(diff)}`)
    // console.log(`before : ${JSON.stringify({x: item.style.left, y: item.style.top} )}`)
    // const before = {x: item.style.left, y: item.style.top}
    item.style.left = `${parseFloat(item.style.left) + diff.x}px`
    item.style.top = `${parseFloat(item.style.top) + diff.y}px`
    // console.log('-----move:' + JSON.stringify(before) + ' -> ' + item.style.left + '/' + item.style.top)
    // console.log(`after : ${JSON.stringify({x: item.style.left, y: item.style.top} )}`)
    prevPosition = { x: event.clientX, y: event.clientY }
    event.preventDefault()
    callback(event, item)
  }

  function onUp(e, callback) {
    // console.log('---------up')
    item = null
    prevPosition = null
    callback(e)
  }

  return {
    bind: function(el, binding) {
      // Down
      el.addEventListener('mousedown', (e) => {
        const callback = binding.value.down || noop
        onDown(e, callback)
      })

      // Move
      document.addEventListener('mousemove', (e) => {
        const callback = binding.value.move || noop
        onMove(e, callback)
      })

      // Up
      const upCallback = binding.value.up || noop
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
