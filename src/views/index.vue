<template>
   <div class="mainDiv">
       <router-link :to="{ name: 'product', params: { id: 123 }}">商品</router-link>
        <router-link :to="{ name: 'event', params: { id: 123 }}">活动</router-link>
        <router-link :to="{ name: 'applyVip'}">申请VIP</router-link>
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
}
</style>