import Vue from 'vue'

const setting = {
  namespaced: true,
  state: {
    mode: 0
  },
  getters: {
  },
  mutations: {
    update(state: any, payload: any) {
      Object.keys(payload).forEach( key => {
        Vue.set(state, key, payload[key])
      })
    },
  },
  actions: {
  },
  modules: {
  }
}


export default setting