// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import md5 from 'js-md5'
import Vuex from 'vuex'
import 'lib-flexible/flexible.js'

Vue.use(Vuex)
Vue.use(ElementUI)

axios.defaults.baseURL = 'http://106.14.140.30:5000'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.$md5 = md5

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    console.log('需要登录')
    if (localStorage.token) { // 判断当前的token是否存在 ； 登录存入的token
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
