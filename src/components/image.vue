<template>
    <img src="./placeholder.png" ref="loadImage" alt="" >
</template>
<script>
    import axios from 'axios'
    import path from 'path'
    export default {
        props: ['imgSrc'],
        data(){
            return{
                
            }
        },
        //目前能力还是找不到好的方案
        mounted(){
             this.$refs.loadImage.onerror = function (e) {
                 console.log('aaa')
                 this.src = './placeholder.png'
                 e.handle = true
             }
           
             
        },
        computed: {
         
        }
    }
</script>