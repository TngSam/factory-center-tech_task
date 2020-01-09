import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

import Auth from '@/views/Auth'
import Main from '@/views/Main'
import Question from '@/views/Question'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'auth',
    component: Auth
  },
  {
    path: '/',
    name: 'main-page',
    component: Main
  },
  {
    path: '/question',
    name: 'question',
    component: Question
  },
  {
    path: '/question/:index',
    name: 'question',
    component: Question
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to, from, store.state.isAuth)
  if (!store.state.isAuth && to.path !== '/login') {
    return next('/login')
  } else if (store.state.isAuth && to.path === '/login') {
    return next('/')
  }
  
  next()
})

export default router
