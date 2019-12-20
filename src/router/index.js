import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component(resolve){
        require(['@/views/Login'], resolve)
      } 
    },
    {
      path: '/calculate/index',
      name: 'index',
      component(resolve){
        require(['@/views/calculate/index'], resolve)
      } 
    },
    {
      path: '/calculate/input',
      name: 'Input',
      component(resolve){
        require(['@/views/calculate/Input'], resolve)
      }
    },
    {
      path: '/calculate/crscyllj',
      name: 'Crscyllj',
      component(resolve){
        require(['@/views/calculate/crscyllj'], resolve)
      }
    },
    {
      path: '/calculate/result',
      name: 'Result',
      component(resolve){
        require(['@/views/calculate/Result'], resolve)
      }
    },
    {
      path: '/product',
      name: 'Product',
      component(resolve){
        require(['@/views/product/Product'], resolve)
      }
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component(resolve){
        require(['@/views/product/Detail'], resolve)
      }
    },
    {
      path: '/product/proposal/:type',
      name: 'Proposal',
      component(resolve){
        require(['@/views/product/Proposal'], resolve)
      }
    },
    {
      path: '/service/myinfo',
      name: 'MyInfo',
      component(resolve){
        require(['@/views/service/MyInfo'], resolve)
      }
    },
    {
      path: '/service/points',
      name: 'GetPoints',
      component(resolve){
        require(['@/views/service/GetPoints'], resolve)
      }
    },
    {
      path: '/service/consult',
      name: 'Consult',
      component(resolve){
        require(['@/views/service/Consult'], resolve)
      }
    },
    {
      path: '/service/moments',
      name: 'Moments',
      component(resolve){
        require(['@/views/service/Moments'], resolve)
      }
    },
    {
      path: '/imgCropper',
      name: 'ImgCropper',
      component(resolve){
        require(['@/components/upload/ImgCropper'], resolve)
      }
    },
    {
      path: '/updateInfo',
      name: 'UpdateInfo',
      component(resolve){
        require(['@/views/service/UpdateInfo'], resolve)
      }
    },
    {
      path: '/updatePhone',
      name: 'UpdatePhone',
      component(resolve){
        require(['@/views/service/UpdatePhone'], resolve)
      }
    },
    {
      path: '/building',
      name: 'Building',
      component(resolve){
        require(['@/views/Building'], resolve)
      }
    },
  ]
})
