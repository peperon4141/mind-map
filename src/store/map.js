import Vue from 'vue'
import jsonData from '../samples/sample1.json'

const map = {
  state: {
    currentId: null,
    elements: jsonData.elements,
    lines: jsonData.lines,
    groupds: jsonData.groups,
    comments: jsonData.comments,
    defaultStyles: jsonData.defaultStyles,
    history: []
  },
  getters: {
    allElements: state => state.elements,
    allLines: state => state.lines,
    allHistory: state => state.history,
    findElement: state => (id) => {
      return state.elements[id]
    },
    currentId: state => state.currentId,
    parents: state => {
      const parentIds = state.lines.map( line => line.from )
      return parentIds
    },
    map: state => {
      return {
        'elem-1': {
          'elem-2': {},
          'elem-3': {},
          'elem-4': {},
        }
      }
    }
  },
  mutations: {
    setCurrent(state, id) {
      state.currentId = id
    },
    updateElementPosition(state, payload) {
      let targetElem = state.elements[payload.id]
      if (targetElem && payload.position) {
        targetElem.position = payload.position
      }
    },
    create(state, payload) {
      console.log(`----------create--${JSON.stringify(payload)}`)
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
        elems: [newElem, newLine ]
      })
      Vue.set(state.elements, elemId, newElem)
      Vue.set(state.lines, lineId, newLine)
      state.currentId = elemId
    },
    delete(state, payload) {
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