import Vue from 'vue'
import Router from 'vue-router'

import Test from 'pages/Test'
import Index from 'pages/Index'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  }
]

export default new Router({
  mode: 'history',
  routes
})
