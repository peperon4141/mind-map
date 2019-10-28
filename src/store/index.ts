import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

import jsonData from '../samples/sample1.json'

export default new Vuex.Store({
  state: {
    elements: jsonData.elements,
    lines: jsonData.lines,
    groupds: jsonData.groupds,
    comments: jsonData.comments,
    defaultStyles: jsonData.defaultStyles,
    history: []
  },
  getters: {
    allElements: state => state.elements,
    allLines: state => state.lines,
    findElement: state => (id: string) => {
      return state.elements[id]
    }
  },
  mutations: {
    updateElementPosition(state, payload) {
      let targetElem = state.elements[payload.id]
      if (targetElem && payload.position) {
        targetElem.position = payload.position
      }
    },
    create(state, payload) {
      const from = payload.from
      const elemId = `elem-${Math.random().toString(32).substring(2, 8)}`
      const lineId = `line-${Math.random().toString(32).substring(2, 8)}`
      const newElem = Object.assign({}, state.defaultStyles.element)
      const newLine = { from: from, to: elemId }
      state.history.push( [ newElem, newLine ])
      Vue.set(state.elements, elemId, newElem)
      Vue.set(state.lines, lineId, newLine)
      console.log(state.history)
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
})
