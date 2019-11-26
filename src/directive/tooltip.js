import { gray } from "ansi-colors"

function tooltip() {
  let left = 0
  let top = 0
  let tooltip = null

  function addTooltip(event, text, classes = []) {
    tooltip = document.createElement('div')
    tooltip.innerText = text
    tooltip.id = 'tooltip'
    setStyles({left: event.clientX, top: event.clientY})
    classes.forEach( (className) => tooltip.classList.add(className))
    document.body.appendChild(tooltip)
  }

  function removeTooltip() {
    tooltip.parentNode.removeChild(tooltip)
    tooltip = null
  }

  function setStyles({top, left}) {
    // const parentRect = parent.getBoundingClientRect()
    const styles = {
      position: 'absolute',
      'z-index': 2147483647, // z-index最大値
      top: `${top + 20}px`,
      left: `${left}px`,
      padding: '2px 8px',
      'background-color': 'gray',
      'border-radius': '2px',
      opacity: 0.6
    }
    Object.keys(styles).forEach( key => {
      tooltip.style[camelCase(key)] = styles[key]
    })
  }

  function camelCase(str){
    str = str.charAt(0).toLowerCase() + str.slice(1);
    return str.replace(/[-_](.)/g, (match, group) => group.toUpperCase())
  }

  return {
    bind: function(el, binding) {

      // tooltipを追加
      el.addEventListener('mouseenter', (e) => { 
        const { content, classes } = binding.value
        addTooltip(e, content, classes)
      })

      // tooltipを削除
      el.addEventListener('mouseleave', (e) => {
        removeTooltip()
      })
    }
  }
}
export default tooltip()
