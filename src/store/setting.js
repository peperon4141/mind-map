import Vue from 'vue'

const setting = {
  state: {
    user: {},
    project: {}
  },
  getters: {
    userSetting: state => state.user,
    projectSetting: state => state.project,
  },
  mutations: {
    changeUserSetting(state, payload) {
      console.log(payload)
      Object.keys(payload).forEach( key => {
        Vue.set(state.user, key, payload[key])
      })
    },
  },
  actions: {
  },
  modules: {
  }
}


export default setting