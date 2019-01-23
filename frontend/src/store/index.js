import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  state:{
    //放置初始状态
  }
})

export default store
export default new Vuex.Store({
  modules: {
  },
  strict: debug
})
