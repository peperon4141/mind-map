import Vue from 'vue'
import jsonData from '../samples/sample2.json'

const map = {
  namespaced: true,
  state: {
    currentId: null,
    elements: jsonData.elements,
    lines: jsonData.lines,
    groupds: jsonData.groups,
    comments: jsonData.comments,
    defaultStyles: jsonData.defaultStyles,
    info: jsonData.info,
    history: [],
    size: { x: 2000, y: 2000 },
    view: { x: 800, y: 800 },
    offset: { x: 0, y: 0 }
  },
  getters: {
  },
  mutations: {
    setCurrent(state: any, id: string) {
      state.currentId = id
    },
    update(state: any, payload: any) {
      Object.keys(payload).forEach( key => {
        Vue.set(state, key, payload[key])
      })
    },
    updateElem(state: any, payload: any) {
      const style = payload.value.style
      Object.keys(style).forEach( key => {
        Vue.set(state.elements[payload.id].style, key, style[key])
      })
    },
    updateElementPosition(state: any, payload: any) {
      let targetElem = state.elements[payload.id]
      if (targetElem && payload.position) {
        targetElem.position = payload.position
      }
    },
    create(state: any, payload: any) {
      const from = payload.from
      const parentElem = state.elements[from]
      const elemId = `elem-${Math.random().toString(32).substring(2, 8)}`
      const lineId = `line-${Math.random().toString(32).substring(2, 8)}`
      const newElem = Object.assign({}, state.defaultStyles.element)
      newElem.position = {
        x: parentElem.position.x + 140,
        y: parentElem.position.y,
      }
      const newLine = { from: from, to: elemId }
      state.history.push({
        type: 'create',
        elem: newElem,
        line: newLine
      })
      Vue.set(state.elements, elemId, newElem)
      Vue.set(state.lines, lineId, newLine)
      state.currentId = elemId
    },
    delete(state: any, payload: any) {
      state.history.push({
        type: 'delete',
        id: payload.id
      })
      delete state.elements[payload.id]
      Object.keys(state.lines).forEach(lineKey => {
        const line = state.lines[lineKey]
        if (line.from === payload.id || line.to === payload.id) {
          delete state.lines[lineKey]
        }
      })
    }
  },
  actions: {
  },
  modules: {
  }
}
export default map