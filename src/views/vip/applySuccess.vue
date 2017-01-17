<template>
    <div class="applyVipSuccessMainDiv">
        <img class="wanjiaVip"  src="./wanPlusVIP.png" alt="">
        <div class="getVip">
           <img src="./getSuccess.png" alt="">
        </div>
      
        <div>
            <button class="enterWanjiaButton" @click="openApp" type="">进入玩+APP</button>
        </div>
        <div class="imgAppluSuccess">
            <img src = "http://img1.gamersky.com/image2017/01/20170114_zl_91_12/gamersky_05origin_09_201711416316C2.jpg" alt=""></ie>
        </div>
    </div>
</template>
<script>
    import {APPCommon} from '../../tool/openApp'
    export default {
    data() {
      return {
         
      }
    },
    methods:{
        openApp(){
            APPCommon.openApp()
        }
    }
    
   }
</script>
<style>
div.applyVipSuccessMainDiv{
    text-align: center;
    background: white;
  
}
.wanjiaVip{
    margin-top: 3rem;
    width: 60%
}
.getVip img{
    width: 40%;
    height: 0.9rem;
}
.enterWanjiaButton{
     margin-top: 0.4rem;
    height: 1.2rem;
    background: orangered;
    border: 0px;
    border-radius: 0.2rem;
    width: 84%;
    color: white;
    font-size: 0.5rem;
}
.imgAppluSuccess img{
    width: 100%;
    margin-top: 3rem;
}
</style>