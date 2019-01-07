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
      path: '/monday',
      name: 'Monday',
      component: () => import('@/views/Monday')
    },
    {
      path: '/basis',
      name: 'Basis',
      component: () => import('@/views/Basis')
    },
    {
      path: '/health',
      name: 'Health',
      component: () => import('@/views/Health')
    }
  ]
})
