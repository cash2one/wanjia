<template>
    <div style="font-size: 0.5rem;">
        
    </div>
</template>
<script>
import Vue from 'vue'
import { Toast } from 'mint-ui'
import axios from 'axios'
 export default{
    data() {
      return {

       orderInfo:{}
      }
    },
    mounted(){
       if(!isWebchat()){
        login()
       }
    },   
    components:{
        counter,
        cal,
        Toast
    },
    methods:{
   
    },
 }
</script>
<style>

</style>