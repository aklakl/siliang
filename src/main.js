// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '@/styles/index.less' // global css
import '@/styles/theme.less' // global css
import App from './App'
import router from './router'
import store from './store'
import '@/icons'
import 'babel-polyfill'
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
import { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)
Vue.config.productionTip = false
import { ConfigPlugin } from 'vux'
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
