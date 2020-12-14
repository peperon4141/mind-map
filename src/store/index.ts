import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import map from '@/store/map.ts'
import user from '@/store/user.ts'
import project from '@/store/project.ts'

// const map = require('@/store/map')
// const user = require('@/store/user')
// const project = require('@/store/project.js')

export default new Vuex.Store({
  modules: {
    map: map,
    user: user,
    project: project
  }
})
