import Vue from 'vue'
import App from './App'
import router from './router'
import 'assets/master.scss'

/* eslint-disable-next-line no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
