import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import map from '@/store/map.js'
import user from '@/store/user.js'
import project from '@/store/project.js'

export default new Vuex.Store({
  modules: {
    map: map,
    user: user,
    project: project
  }
})
