import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import calculate from './modules/calculate'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    calculate
  },
  getters
})

export default store
