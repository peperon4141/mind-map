import Vue from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, far, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// import common css
import '@/assets/common.sass'

// vue directiveのインストール
import draggable from '@/directive/draggable'
Vue.directive('drag', draggable)
import tooltip from '@/directive/tooltip'
Vue.directive('tooltip', tooltip)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
