<template>
     <div class="openAppDiv">
           <img class="imgLogo" src="static/img/main/wanjia_logo.png" alt="">
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
.openAppDiv{
    background: rgba(200, 200, 200, 0.8);
    width: 100%;
    height: 2rem;
}
img.imgLogo{
    height: 1.5rem;
    margin-left: 0.4rem;
    margin-top: 0.3rem;
}
button.btnOpenApp{
    background: #fe6734;
    color: white;
    font-size: 0.6rem;
    border-radius: 0.1rem;
    border: 0px;
    padding: 0.2rem 0.25rem;
    float: right;
    margin: 0.35rem 0.3rem;
}
</style>
