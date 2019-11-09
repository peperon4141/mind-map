import Vue from 'vue'

const setting = {
  state: {
    mode: 0
  },
  getters: {
  },
  mutations: {
    changeUserSetting(state, payload) {
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