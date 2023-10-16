import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import "./utils/rem"
import "./style/common.less"

new Vue({
  render: h => h(App),
}).$mount('#app')
