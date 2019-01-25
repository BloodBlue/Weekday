import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login')
    },
    {
      path: '/li',
      name: 'Li',
      component: () => import('@/views/Li')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register')
    },
    {
      path: '/mailpsw',
      name: 'Mailpsw',
      component: () => import('@/views/Mailpsw')
    },
    {
      path: '/monday',
      name: 'Monday',
      component: () => import('@/views/Monday'),
      meta: { requireAuth: true }
    },
    {
      path: '/question',
      name: 'Question',
      component: () => import('@/views/Question'),
      meta: { requireAuth: true }
    },
    {
      path: '/frequency',
      name: 'frequency',
      component: () => import('@/views/frequency'),
      meta: { requireAuth: true }
    },
    {
      path: '/',
      name: 'App',
      redirect: '/login',
      meta: { requireAuth: true }
    },
    {
      path: '/home',
      name: 'Home',
      meta: { requireAuth: true }
    }
  ]
})
