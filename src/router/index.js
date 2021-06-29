import Vue from 'vue'
import VueRouter from 'vue-router'
import SearchPageView from '../views/SearchPageView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SearchPageView',
    component: SearchPageView
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
