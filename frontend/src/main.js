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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
