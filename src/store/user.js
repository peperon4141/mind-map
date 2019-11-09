import Vue from 'vue'

const setting = {
  state: {
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