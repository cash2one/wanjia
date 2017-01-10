<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
   export default{
        name:'index',
        data(){
            return{
               
            }
   },}
</script>
<style >
body{
    margin: 0px;
}
.wanjiaHeadDiv{
   background: #383459;
   height: 1.3rem;
   font-size: 1rem;
   line-height: 1.3rem;
   text-align: center;
   display: flex
}
.wanjiaHeadDiv img{
   width: 0.45rem;
   height: 0.6rem;
   margin-left: 0.3rem;
   margin-top: 0.4rem;
}
.wanjiaHeadDiv span{
   color: white;
}
.navTitle{
    font-size: 0.5rem;
    margin-top: 0.1rem;
}
span.navRightTitle{
    font-size: 0.3rem;
    margin-right: 0.5rem;
}
</style>