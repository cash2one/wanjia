<template>
    <div class="mainFootDiv">
        <span class="itemMenu" @click='mainPage' >首页</span>
        <span class="itemMenu" @click='orderPage'>订单</span>
        <span class="itemMenu" @click='myPage'>我的</span>
        <span class="itemMenu" @click='outPage'>退出</span>
    </div>
</template>
<script>
    
    export default {
        data(){
            return{}
        },
        methods:{
            mainPage(){
                this.$emit('mainPageClick')
            },
            orderPage(){
                this.$emit('orderPageClick')
            },
            myPage(){
                this.$emit('myPageClick')
            },
            outPage(){
                this.$emit('outPageClick')
            },
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
    font-size: 0.4rem;
    
}
.itemMenu{
    vertical-align: middle;
    border-right: 1px solid red;
    height: 0.7rem;
    width: 25%;
    text-align: center;
    margin-top: 0.3rem;
    line-height: 0.7rem;
}
.itemMenu:last-child{
    border-right: 0px ;
}
</style>