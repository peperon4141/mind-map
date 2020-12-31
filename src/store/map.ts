import Vue from 'vue'
import Command from '../../node_modules/mind_cli/src/command'

let history = new Command([])
  .add('test1')
  .add('test2')
  .add('test3')
  .add('test4')
  .history
let tree: any = new Command(history).tree()
tree = new Command(history)
  .connect(Object.keys(tree.items)[0], Object.keys(tree.items)[1])
  .connect(Object.keys(tree.items)[0], Object.keys(tree.items)[2])
  .tree()

const map = {
  namespaced: true,
  state: {
    currentId: null,
    history: [],
    size: { x: 2000, y: 2000 },
    view: { x: 800, y: 800 },
    offset: { x: 0, y: 0 },
    tree: tree
  },
  getters: {
    items: (state: any) => state.tree.items,
    connectors: (state: any) => state.tree.connectors, 
    history: (state: any) => state.tree.history
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
      const updatedParams = payload.value
      Object.keys(updatedParams).forEach( key => {
        Vue.set(state.tree.items[payload.id], key, updatedParams[key])
      })
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