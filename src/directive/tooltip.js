function tooltip() {
  let tooltip = null

  function addTooltip(el, text, classes = []) {
    tooltip = document.createElement('div')
    tooltip.innerText = text
    tooltip.id = 'tooltip'
    setStyles(tooltip, el)
    classes.forEach( (className) => tooltip.classList.add(className))
    document.body.appendChild(tooltip)
  }

  function setStyles(target, parent) {
    const parentRect = parent.getBoundingClientRect()
    const styles = {
      position: 'absolute',
      'z-index': 2147483647, // z-index最大値
      top: `${parentRect.top - 32}px`,
      left: `${parentRect.left - target.getBoundingClientRect().width / 2}px`,
      transform: `translate(calc(-50% + ${parentRect.width / 2}px), 0)`
    }
    Object.keys(styles).forEach( key => {
      target.style[camelCase(key)] = styles[key]
    })
  }

  function camelCase(str){
    str = str.charAt(0).toLowerCase() + str.slice(1);
    return str.replace(/[-_](.)/g, (match, group) => group.toUpperCase())
  }

  function removeTooltip() {
    tooltip.parentNode.removeChild(tooltip)
  }

  return {
    bind: function(el, binding) {
      // tooltipを追加
      el.addEventListener('mouseenter', (e) => { 
        const { content, classes } = binding.value
        addTooltip(el, content, classes)
      })

      // tooltipを削除
      el.addEventListener('mouseleave', (e) => {
        removeTooltip()
      })
    }
  }
}
export default tooltip()
