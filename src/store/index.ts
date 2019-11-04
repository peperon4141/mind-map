import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import map from '@/store/map.js'
import setting from '@/store/setting.js'

export default new Vuex.Store({
  modules: {
    map: map,
    setting: setting
  }
})
