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
      path: '/seven',
      name: 'Seven',
      component: () => import('@/views/Seven'),
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
      component: () => import('@/views/Home'),
      meta: { requireAuth: true }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/views/Admin'),
      meta: { requireAuth: true }
    }
  ]
})
