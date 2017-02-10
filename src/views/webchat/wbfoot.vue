<template>
    <div class="mainFootDiv">
        <span class="itemMenu">首页</span>
        <span class="itemMenu">订单</span>
        <span class="itemMenu">我是</span>
        <span class="itemMenu">道出</span>
    </div>
</template>
<script>
    
    export default {
        data(){
            return{}
        },
        methods:{
            
        }
    }
</script>
<style>
.mainFootDiv{
    background: #eee;
    height: 1.5rem;
    display: flex;
    position: fixed;
    bottom: 0px;
    width: 100%;
    justify-content: space-around;
    font-size: 0.5rem;
    
}
.itemMenu{
    vertical-align: middle;
    border-right: 1px solid red;
    height: 0.8rem;
   width: 25%;
   text-align: center;
   margin-top: 0.3rem;
}
</style>