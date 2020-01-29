// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '@/styles/index.less' // global css
import '@/styles/theme.less' // global css
import App from './App'
import MobileApp from './MobileApp'
import WebApp from './WebApp'
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

import commonUtil from './utils/utils';
import jquery from 'jquery';

/* eslint-disable no-new */
//search exclude= dist,node_modules
console.log("start window.commonUtils");
window.commonUtils = commonUtil;
window.jquery = jquery;
console.log("end window.commonUtils");

let init = function (){
  let cComponent = App;
  let cTemplate = '<app/>';
  // let cComponent = MobileApp;
  // let cTemplate = '<MobileApp/>';
  // if ( !commonUtils.isMobile() ){
  //   cComponent= WebApp;
  //   cTemplate = '<WebApp/>';
  // }

 return new Vue({
    router,
    store,
    components: { cComponent },
    data: { message: 'Vue life cycle'},
    beforeCreate: function() {
      console.group('------beforeCreate ------');
      console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
      console.log("%c%s", "color:red","data   : " + this.$data); //undefined 
      console.log("%c%s", "color:red","message: " + this.message) 
    },
    created: function() {
      console.group('------created ------');
      console.log("%c%s", "color:red","el     : " + this.$el); //undefined
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化 
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化
    },
    beforeMount: function() {
      console.group('------beforeMount ------');
      console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化  
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化  
    },
    mounted: function() {
      console.group('------mounted  ------');
      console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
      console.log(this.$el);    
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化 
    },
    beforeUpdate: function () {
      console.group('beforeUpdate  ===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);   
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message); 
    },
    updated: function () {
      console.group('updated  ===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el); 
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message); 
    },
    beforeDestroy: function () {
      console.group('beforeDestroy  ===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);    
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message); 
    },
    destroyed: function () {
      console.group('destroyed  ===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);  
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message)
    },
    computed: {
      count: function() {
        let result = 'main js The count is ' + this.items.length * 10;
        console.log(result);
        return result;
      }
    },
    render: h => h(cComponent)

  });

};

init().$mount('#mainApp');
