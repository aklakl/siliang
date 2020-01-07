import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component(resolve){
        require(['@/views/web/login'], resolve)
      } 
    },
    {
      path: '/mobile/login',
      name: 'mobileLogin',
      component(resolve){
        require(['@/views/Login'], resolve)
      } 
    },
    {
      path: '/web/login',
      name: 'webLogin',
      component(resolve){
        require(['@/views/web/login'], resolve)
      } 
    },{
      path: '/web/index',
      name: 'webIndex',
      component(resolve){
        require(['@/views/web/login'], resolve)
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
      path: '/calculate/mcscllj',
      name: 'mcscllj',
      component(resolve){
        require(['@/views/calculate/mcscllj'], resolve)
      }
    },
    {
      path: '/calculate/xxdlscllj',
      name: 'xxdlscllj',
      component(resolve){
        require(['@/views/calculate/xxdlscllj'], resolve)
      }
    },
/*
水和水蒸汽物性值计算 		shszqwxzjs
天然气物性值计算			trqwxzjs
其它气体、液体物性值计算	qtqtytwxzjs
流体物性值计算			ltwxzjs
shui he shui zheng qi wu xing zhi ji suan
tian ran qi wu xing zhi ji suan
qi ta qi ti 、 ye ti wu xing zhi ji suan
liu ti wu xing zhi ji suan
*/
    {
      path: '/calculate/wxz/shszqwxzjs',
      name: 'shszqwxzjs',
      component(resolve){
        require(['@/views/calculate/wxz/shszqwxzjs'], resolve)
      }
    },
    {
      path: '/calculate/wxz/trqwxzjs',
      name: 'trqwxzjs',
      component(resolve){
        require(['@/views/calculate/wxz/trqwxzjs'], resolve)
      }
    },
    {
      path: '/calculate/wxz/qtqtytwxzjs',
      name: 'qtqtytwxzjs',
      component(resolve){
        require(['@/views/calculate/wxz/qtqtytwxzjs'], resolve)
      }
    },
    {
      path: '/calculate/wxz/ltwxzjs',
      name: 'ltwxzjs',
      component(resolve){
        require(['@/views/calculate/wxz/ltwxzjs'], resolve)
      }
    },
    /*
    流量计设计计算 lljsjjs
    设计计算 标准节流装置 流量计算差压    bzjlzz_lljscy
    设计计算 标准节流装置 流量计算开孔径  bjjlzz_lljskkj
    设计计算 皮托式流量计 流量计算差压    ptsllj_lljscy

    流量工程师工具箱  llgcsgjx
    */
    {
      path: '/calculate/lljsjjs/bzjlzz_lljscy',
      name: 'bzjlzz_lljscy',
      component(resolve){
        require(['@/views/calculate/lljsjjs/bzjlzz_lljscy'], resolve)
      }
    },
    {
      path: '/calculate/lljsjjs/bjjlzz_lljskkj',
      name: 'bjjlzz_lljskkj',
      component(resolve){
        require(['@/views/calculate/lljsjjs/bjjlzz_lljskkj'], resolve)
      }
    },
    {
      path: '/calculate/lljsjjs/ptsllj_lljscy',
      name: 'ptsllj_lljscy',
      component(resolve){
        require(['@/views/calculate/lljsjjs/ptsllj_lljscy'], resolve)
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
