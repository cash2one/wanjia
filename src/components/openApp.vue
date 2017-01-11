<template>
     <div class="openAppDiv">
           <img class="imgLogo" src="./wanjia_logo.png" alt="">
           <a><button type="" @click="openApp" class="btnOpenApp">打开APP</button></a> 
       </div>
</template>
<script>
var APPCommon = {
    iphoneSchema: 'wanjia://',
    iphoneDownUrl: 'https://itunes.apple.com/cn/app/id1176755755',
    androidSchema: 'scheme://wanjia/',
    androidDownUrl: 'https://itunes.apple.com/cn/app/id1176755755',
    openApp: function(){
        var this_  =  this;
        //微信
        if(this_.isWeixin()){
            $(".weixin-tip").css("height",$(window).height());
            $(".weixin-tip").show();
            $('.weixin-tip').on('touchstart', function () {
                $(".weixin-tip").hide();
            });
 
        }else{//非微信浏览器
            if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                window.location = this.iphoneSchema;
                !window.document.webkitHidden && setTimeout(function () {
                    setTimeout(function () {
                        window.location = this_.iphoneDownUrl; //例如http://itunes.apple.com/..
                    }, 100);
                 }, 600);
                
            }else if (navigator.userAgent.match(/android/i)) {
                try {
                    window.location = this_.androidSchema;
                    setTimeout(function(){
                        window.location=this_.androidDownUrl; //android下载地址
                    },500);
                } catch(e) {}
            }
            else{
                window.location.href = this_.iphoneDownUrl
            }
        }
    },
    isWeixin: function(){ //判断是否是微信
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }
};
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
