<template>
  <div>
    <!-- {{isMobile}}  -->
    <div v-if="isMobile == true">
      <MobileApp/>
    </div>
    <div v-if="isMobile == false" >
      <WebApp/>  
    </div>
  </div>  
</template>

<script>
console.log(' loading app ');
export default {
  name: "app",
  components: {
    MobileApp: () => import('./MobileApp'),
    WebApp: () => import('./WebApp')
  },
  created() {
    
  },
  data() {
    return {
      isMobile: window.commonUtils.isMobile()
    }
  } 
};
</script>
