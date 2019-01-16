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
      component: () => import('@/views/Monday')
    },
    {
      path: '/question',
      name: 'Question',
      component: () => import('@/views/Question')
    }
  ]
})
