<template>
   <div class="mainDiv">
        <router-link :to="{ name: 'mainPage'}">商品</router-link>
        <router-link :to="{ name: 'product', params: { id: 6 }}">商品</router-link>
        <router-link :to="{ name: 'event', params: { id: 60 }}">活动</router-link>
        <router-link :to="{ name: 'applyVip'}">申请VIP</router-link>
        <router-link :to="{ name: 'applySuccess'}">申请VIP成功</router-link>
        <router-link :to="{ name: 'firmVipAuth'}">企业主认证</router-link>
        <router-link :to="{ name: 'firmApplied'}">企业主认证申请成功</router-link>
   </div>
</template>
<script>
    export default{
        name:'index',
        data(){
            return{
            }
        },
      
        methods:{
           
        }
    }
</script>
<style>
div.mainDiv{
    max-width: 750px;
    min-width: 320px;
    background: #eee;
    font-size: 1rem;
}
div.mainDiv a{
   display: block
}
ul{
    padding: 0;
    margin: 0;
}
</style>