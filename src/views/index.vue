<template>
   <div class="mainDiv">
       <router-link :to="{ name: 'product', params: { id: 123 }}">商品</router-link>
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