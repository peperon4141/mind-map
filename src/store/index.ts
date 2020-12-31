import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import map from '@/store/map'
import user from '@/store/user'
import project from '@/store/project'

export default new Vuex.Store({
  modules: {
    map: map,
    user: user,
    project: project
  }
})
