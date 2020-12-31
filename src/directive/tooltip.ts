function tooltip() {
  let tooltip: any = null

  function addTooltip(event: any, text: string) {
    tooltip = document.createElement('div')
    tooltip.innerText = text
    tooltip.id = 'tooltip'
    setStyles({left: `${event.clientX}px`, top: `${event.clientY}px`})
    document.body.appendChild(tooltip)
  }

  function removeTooltip() {
    if (!tooltip) return
    tooltip.parentNode.removeChild(tooltip)
    tooltip = null
  }

  function setStyles(optionalStyle: Object) {
    if (!tooltip) return
    const defaultStyle = {
      position: 'absolute',
      'zIndex': 2147483647, // z-index最大値
      padding: '2px 8px',
      'backgroundColor': 'gray',
      'borderRadius': '2px',
      opacity: 0.6
    }
    tooltip.style = Object.assign(defaultStyle, optionalStyle)
  }

  return {
    bind: function(el: HTMLElement, binding: any) {

      // tooltipを追加
      el.addEventListener('mouseenter', (e: Event) => { 
        const { content } = binding.value
        addTooltip(e, content)
      })

      // tooltipを削除
      el.addEventListener('mouseleave', (e: Event) => {
        removeTooltip()
      })
    }
  }
}
export default tooltip()
