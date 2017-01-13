<template>
     <div class="openAppDiv">
           <img class="imgLogo" src="./wanjia_logo.png" alt="">
           <a><button type="" @click="openApp" class="btnOpenApp">打开APP</button></a> 
       </div>
</template>
<script>
    import {APPCommon} from '../tool/openApp' //明白了，要用{}把里面的东西拮起来
    export default {
        data(){
            return{}
        },
        methods:{
            openApp:function(){
               APPCommon.openApp()
            }
        }
    }
</script>
<style>
img.imgLogo{
    height: 1rem;
    margin-left: 0.4rem;
    margin-top: 0.2rem;
}
button.btnOpenApp{
    background: #fe6734;
    color: white;
    font-size: 0.3rem;
    border-radius: 0.1rem;
    border: 0px;
    padding: 0.2rem 0.25rem;
    float: right;
    margin: 0.3rem 0.3rem;
}
</style>
