import Vue from 'vue'
import jsonData from '../samples/sample1.json'
import Map from '@/classes/MapManager.ts'

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
    // allElements: state => state.elements,
    // allLines: state => state.lines,
    // allHistory: state => state.history,
    // findElement: state => (id) => {
    //   return state.elements[id]
    // },
    // currentId: state => state.currentId,
    // parents: state => {
    //   const parentIds = Object.keys(state.lines).map( key => state.lines[key].from )
    //   return parentIds
    // },
    // map: state => {
    //   let list = {}
    //   Object.keys(state.lines).forEach(lineKey => {
    //     const line = state.lines[lineKey]
    //     list[line.from] = list[line.from] || {}
    //     list[line.to] = list[line.to] || {}
    //     list[line.from][line.to] = list[line.to]
    //   })
    //   return list
    //   // console.log(list[state.info.root])
      
    //   // return {
    //   //   'elem-1': {
    //   //     'elem-2': {},
    //   //     'elem-3': {},
    //   //     'elem-4': {},
    //   //   }
    //   // }
    // }
  },
  mutations: {
    setCurrent(state, id) {
      state.currentId = id
    },
    update(state, payload) {
      Object.keys(payload).forEach( key => {
        Vue.set(state, key, payload[key])
      })
    },
    // update(state, payload) {
    //   // console.log(payload)
    //   Vue.set(state, payload.key, payload.value)
    // },
    updateElem(state, payload) {
      let targetElem = state.elements[payload.id]
      Object.keys(payload.value).forEach( key => {
        Vue.set(state.elements[payload.id], key, payload.value[key])
      })
    },
    updateElementPosition(state, payload) {
      let targetElem = state.elements[payload.id]
      if (targetElem && payload.position) {
        targetElem.position = payload.position
      }
    },
    create(state, payload) {
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