import Vue from 'vue'
import App from './App.vue'

// *
// Import Tailwind
// *
import '@/assets/css/tailwind.css'

import router from './router'
// *
// End Import Tailwind
// *

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
