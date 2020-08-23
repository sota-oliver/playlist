import Vue from 'vue'
import VueRouter from 'vue-router'
import Albums from '../views/Albums.vue'
import Artist from '../views/Artist.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Albums',
    component: Albums
  },
  {
    path: '/artist/:id',
    props: true,
    name: 'Artist',
    component: Artist
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
