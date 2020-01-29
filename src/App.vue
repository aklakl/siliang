<template>
  <div>
    <!-- {{isMobile}}  -->
    <div v-if="this.isMobile == true">
      <MobileApp/>
    </div>
    <div v-if="this.isMobile == false" >
      <WebApp/>  
    </div>
  </div>  
</template>

<script>
//console.log(' loading app ');
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    MobileApp: () => import('./MobileApp'),
    WebApp: () => import('./WebApp')
  },
  created() {
    
  },
  computed:{
    isFullScreen() {
       if(this.requireFullScreen){
          return false;
        }else{
          return window.commonUtils.isMobile();
        } 
    },
    ...mapGetters(["requireFullScreen"])
  },
  data() {
    return {
      isMobile: window.commonUtils.isMobile()
    }
  } 
};
</script>
