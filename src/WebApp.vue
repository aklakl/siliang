<template>
  <!-- this is a WebApp --> 
  <div id="webApp" >
    
    <!-- this is a WebApp -->
    <div id="WebApp_top" class= "WebApp_top"> 
      <div class="logo">
        <img src="@/assets/logo.jpg" height="70px" alt />
      </div>
    </div>
    <div id="content">
      <div class="left"> </div>

      <div class="right">   </div>
      <div class="middle">
        <router-view />   

      </div>
    </div>
    <!--
    <div id="WebApp_left">  WebApp_left </div>
    <div id="WebApp_body" class= "WebApp_body" >
      
       <router-view /> 
    </div>
    <div id="WebApp_right">  WebApp_right </div>
    -->

    <div id="WebApp_buttom"> 
    
      <img src="@/assets/banner.png" height="70px" alt />
    </div>
  </div>
</template>

<script>
console.log(' loading WebApp ');
export default {
  name: "WebApp",
  created() {
    
  },
};
</script>

<style>
/*
#webApp {
  background: #8a8a8a;
}
*/
#WebApp_top{
  width:100%;
  
}

#WebApp_left{
  width: 30%;
  height:100%;
}

#WebApp_right{
  width: 30%;
  height:100%;
}

#WebApp_body {
  width: 50%;
}

#WebApp_buttom{
  width:100%;
  height:100px;
}

#content{
    height:100%;
}
.left{
    height:100%;
    width: 28%;
    float: left;
    
}
.middle{
    height:100%;
    margin-left:28%;
    margin-right: 28%;
    
}
.right{
    height:100%;
    width: 28%;
    float: right;
    
}

</style>

<!-- background-color: #00a0dc; -->

