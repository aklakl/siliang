import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import calculate from './modules/calculate'
import app from './modules/app'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    calculate,
    app
  },
  getters
})

export default store
